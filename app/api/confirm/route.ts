import { NextRequest, NextResponse } from "next/server";

const DB_ID = process.env.SUBSCRIBERS_DATABASE_ID!;
const NOTION_TOKEN = process.env.NOTION_TOKEN!;

const notionHeaders = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Content-Type": "application/json",
  "Notion-Version": "2022-06-28",
};

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  // Find subscriber by token
  const searchRes = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: "POST",
    headers: notionHeaders,
    body: JSON.stringify({
      filter: {
        property: "Token",
        rich_text: { equals: token },
      },
    }),
  });

  const searchData = await searchRes.json();

  if (!searchData.results || searchData.results.length === 0) {
    return NextResponse.json({ error: "Invalid token." }, { status: 404 });
  }

  const page = searchData.results[0];

  // Update status to active
  await fetch(`https://api.notion.com/v1/pages/${page.id}`, {
    method: "PATCH",
    headers: notionHeaders,
    body: JSON.stringify({
      properties: {
        Status: {
          select: { name: "active" },
        },
      },
    }),
  });

  return NextResponse.json({ success: true });
}