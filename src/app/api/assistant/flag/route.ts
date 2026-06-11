import { NextResponse } from "next/server";
import { addSystemLog } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    const loggedMsg = message ? `Message: "${message.substring(0, 100)}..."` : "No message detail provided.";
    await addSystemLog("warning", `AI Assistant conversation escalated to human review. ${loggedMsg}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error flagging assistant conversation:", error);
    return NextResponse.json({ error: "Failed to record escalation log" }, { status: 500 });
  }
}
