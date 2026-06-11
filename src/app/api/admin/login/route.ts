import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminPassword, generateSessionToken } from "@/lib/crypto";
import { updateMetrics, addSystemLog } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const isValidUser = username.trim() === "Simran";
    const isValidPass = verifyAdminPassword(password);

    if (isValidUser && isValidPass) {
      const sessionToken = generateSessionToken();

      // Store in cookies
      const cookieStore = await cookies();
      cookieStore.set("admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 2, // 2 hours
        path: "/",
      });

      // Update metrics
      await updateMetrics((m) => {
        m.successfulLogins = (m.successfulLogins || 0) + 1;
      });

      // Audit Log
      await addSystemLog("security", "Successful admin login event.");

      return NextResponse.json({ success: true });
    } else {
      // Update metrics
      await updateMetrics((m) => {
        m.failedLogins = (m.failedLogins || 0) + 1;
      });

      // Audit Log
      await addSystemLog("security", `Failed admin login attempt using username: ${username.trim()}`);

      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
  } catch (error: any) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Authentication system error" }, { status: 500 });
  }
}
