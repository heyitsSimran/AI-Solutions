import { NextResponse } from "next/server";
import { updateMetrics } from "@/lib/db";

export async function POST() {
  try {
    const dateStr = new Date().toISOString().split("T")[0];

    await updateMetrics((metrics) => {
      metrics.totalPageViews = (metrics.totalPageViews || 0) + 1;
      metrics.pageViewsByDate[dateStr] = (metrics.pageViewsByDate[dateStr] || 0) + 1;
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking metrics:", error);
    return NextResponse.json({ error: "Failed to track metrics" }, { status: 500 });
  }
}
