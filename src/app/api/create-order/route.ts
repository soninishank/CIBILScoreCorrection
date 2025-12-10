import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const amount = Number(body.amount); // expected in rupees (e.g. 299)
    const currency = body.currency || "INR";
    const receipt = body.receipt || `rcpt_${Date.now()}`;
    const notes = body.notes || {}; // optional

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ ok: false, error: "Invalid amount" }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json({ ok: false, error: "Razorpay keys not configured" }, { status: 500 });
    }

    // Razorpay expects amount in paise
    const payload = {
      amount: Math.round(amount * 100),
      currency,
      receipt,
      payment_capture: 1, // auto-capture
      notes,
    };

    // Basic auth header
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

    const resp = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      console.error("Razorpay order create failed:", text);
      return NextResponse.json({ ok: false, error: "Razorpay order creation failed" }, { status: 502 });
    }

    const data = await resp.json();
    return NextResponse.json({ ok: true, order: data });
  } catch (err) {
    console.error("create-order error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
