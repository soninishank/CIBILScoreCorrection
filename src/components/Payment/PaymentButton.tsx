"use client";

import { useState } from "react";

type PaymentButtonProps = {
  amount: number; // rupees, e.g. 299
  currency?: string;
  description?: string;
  customerName?: string;
  customerEmail?: string;
  onSuccess?: (payment: any) => void; // optional callback after verification
};

export default function PaymentButton({
  amount,
  currency = "INR",
  description,
  customerName,
  customerEmail,
  onSuccess,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  async function loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      if ((window as any).Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  }

  async function startPayment() {
    setLoading(true);
    try {
      await loadRazorpayScript();

      // 1) create order on server
      const resp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency,
          receipt: `rcpt_${Date.now()}`,
          notes: { description: description || "" },
        }),
      });

      const json = await resp.json();
      if (!resp.ok || !json.ok) {
        throw new Error(json?.error || "Order creation failed");
      }

      const order = json.order;

      // 2) open checkout
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // NOTE: expose key id to client (not secret)
        amount: order.amount, // in paise
        currency: order.currency,
        name: "CIBIL Thik Kare",
        description: description || "Consultation fee",
        order_id: order.id,
        handler: async function (response: any) {
          // response has razorpay_payment_id, razorpay_order_id, razorpay_signature
          try {
            // send to server to verify signature
            const verifyResp = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyJson = await verifyResp.json();
            if (verifyResp.ok && verifyJson.ok && verifyJson.verified) {
              // verified — call callback and/or show success
              if (onSuccess) onSuccess(response);
              alert("Payment successful and verified.");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Payment verification error", err);
            alert("An error occurred verifying payment.");
          }
        },
        prefill: {
          name: customerName || "",
          email: customerEmail || "",
          contact: "", // optional
        },
        theme: {
          color: "#2563EB",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("payment error:", err);
      alert(err?.message || "Payment could not be initiated");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={startPayment}
      disabled={loading}
      className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60"
    >
      {loading ? "Processing..." : `Pay ₹${amount}`}
    </button>
  );
}
