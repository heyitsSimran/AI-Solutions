import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteInquiry, deleteReview, clearSystemLogs } from "@/lib/db";

async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return !!(session && session.value);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { type, id } = body;

    if (type === "inquiry" && id) {
      const success = await deleteInquiry(id);
      return success
        ? NextResponse.json({ success: true })
        : NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
    }

    if (type === "review" && id) {
      const success = await deleteReview(id);
      return success
        ? NextResponse.json({ success: true })
        : NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }

    if (type === "logs") {
      const success = await clearSystemLogs();
      return success
        ? NextResponse.json({ success: true })
        : NextResponse.json({ error: "Failed to clear logs" }, { status: 500 });
    }

    return NextResponse.json({ error: "Invalid delete type" }, { status: 400 });
  } catch (error: any) {
    console.error("Error deleting data:", error);
    return NextResponse.json({ error: "Failed to delete data" }, { status: 500 });
  }
}
