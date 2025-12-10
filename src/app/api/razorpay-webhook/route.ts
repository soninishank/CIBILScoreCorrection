import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

  const expected = crypto.createHmac("sha256", webhookSecret).update(raw).digest("hex");
  if (expected !== signature) {
    console.warn("Invalid webhook signature");
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(raw);
  // handle event.type accordingly, e.g. store in DB, send receipt, update order status
  console.log("Razorpay webhook event:", event.event, event.payload);

  return NextResponse.json({ ok: true });
}