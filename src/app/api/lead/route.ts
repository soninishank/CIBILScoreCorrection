import { NextResponse } from "next/server";

const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL;
const LEAD_SECRET = process.env.LEADS_SECRET;

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    // Basic validation
    const { name, phone, message, language, source } = payload ?? {};
    if (!name || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields: name, phone and message are required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // 1) If webhook URL is configured -> forward with secret
    if (WEBHOOK_URL) {
      try {
        const body = {
          name,
          phone,
          message,
          language: language ?? "en",
          source: source ?? "",
          ts: timestamp,
          secret: LEAD_SECRET ?? "",
        };

        const res = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Webhook response not ok:", res.status, text);
          return NextResponse.json({ ok: false, error: "Webhook failed" }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
      } catch (err) {
        console.error("Webhook post error:", err);
        return NextResponse.json({ ok: false, error: "Webhook failed" }, { status: 502 });
      }
    }

    // 3) Fallback for dev: log to server console
    console.log("Lead received (dev log):", { name, phone, message, language, source, ts: timestamp });
    return NextResponse.json({ ok: true, note: "Logged to server console (dev)" });
  } catch (err) {
    console.error("Server error in /api/lead:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
