import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

const DB_ID = process.env.SUBSCRIBERS_DATABASE_ID!;
const NOTION_TOKEN = process.env.NOTION_TOKEN!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

const notionHeaders = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Check for duplicate
  const searchRes = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: "POST",
    headers: notionHeaders,
    body: JSON.stringify({
      filter: {
        property: "Email",
        email: { equals: email },
      },
    }),
  });

  const searchData = await searchRes.json();

  if (searchData.results?.length > 0) {
    return NextResponse.json({ error: "You're already subscribed!" }, { status: 409 });
  }

  // Generate confirmation token
  const token = uuidv4();

  // Add to Notion as pending
  await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: notionHeaders,
    body: JSON.stringify({
      parent: { database_id: DB_ID },
      properties: {
        Name: {
          title: [{ text: { content: email } }],
        },
        Email: {
          email: email,
        },
        "Subscribed Date": {
          date: { start: new Date().toISOString() },
        },
        Status: {
          select: { name: "pending" },
        },
        Token: {
          rich_text: [{ text: { content: token } }],
        },
      },
    }),
  });

  // Send confirmation email
  await transporter.sendMail({
    from: `"SysJosh Weekly (no-reply)" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Confirm your subscription to SysJosh Weekly",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 460px; margin: 0 auto; padding: 2rem;">
        <h2 style="font-size: 1.5rem; font-weight: 700; color: #111;">🫙 SysJosh Weekly</h2>
        <p style="color: #444; line-height: 1.6;">Thanks for signing up! Click the button below to confirm your subscription.</p>
        <a href="${BASE_URL}/confirm?token=${token}"
           style="display: inline-block; margin-top: 1.5rem; padding: 0.875rem 2rem; background: #4A90D9; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Confirm Subscription
        </a>
        <p style="margin-top: 2rem; font-size: 0.75rem; color: #bbb;">If you didn't sign up for this, you can safely ignore this email.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}