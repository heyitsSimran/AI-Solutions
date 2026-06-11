import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getInquiries, getReviews, getSystemLogs, getSentEmails, getMetrics } from "@/lib/db";

async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return !!(session && session.value);
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const inquiries = await getInquiries();
    const reviews = await getReviews();
    const metrics = await getMetrics();
    const logs = await getSystemLogs();
    const sentEmails = await getSentEmails();

    return NextResponse.json({
      success: true,
      data: {
        inquiries,
        reviews,
        metrics,
        logs,
        sentEmails,
      },
    });
  } catch (error: any) {
    console.error("Error retrieving admin data:", error);
    return NextResponse.json({ error: "Failed to load admin console data" }, { status: 500 });
  }
}
