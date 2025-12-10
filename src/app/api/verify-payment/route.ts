import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ ok: false, error: "Missing parameters" }, { status: 400 });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ ok: false, error: "Razorpay key secret not configured" }, { status: 500 });
    }

    // signature verification: hmac_sha256(order_id + "|" + payment_id)
    const hmac = crypto.createHmac("sha256", keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest("hex");

    if (expectedSignature === razorpay_signature) {
      // signature valid — you can record payment details in DB or Google Sheet here
      // Example: forward to your /api/lead or log; implement as needed.

      return NextResponse.json({ ok: true, verified: true });
    } else {
      console.warn("Invalid signature", { expectedSignature, razorpay_signature });
      return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (err) {
    console.error("verify-payment error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
