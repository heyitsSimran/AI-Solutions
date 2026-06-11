import { NextResponse } from "next/server";
import { addReview, addSystemLog, getInquiries, getReviews } from "@/lib/db";

const VERIFIED_COMPANIES = [
  "quantum tech",
  "innovate software",
  "apex systems",
  "stellar robotics",
  "blue horizon",
  "intel",
  "microsoft",
  "nvidia",
  "amd",
  "google",
  "himalaya tech",
  "nepal digital solutions",
  "kathmandu engineering works",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerCompany, ratings, comment } = body;

    // Field validations
    if (!customerName || typeof customerName !== "string" || customerName.trim().length === 0) {
      return NextResponse.json({ error: "Customer Name is required" }, { status: 400 });
    }
    if (!customerCompany || typeof customerCompany !== "string" || customerCompany.trim().length === 0) {
      return NextResponse.json({ error: "Company Name is required" }, { status: 400 });
    }
    if (!ratings || typeof ratings !== "object") {
      return NextResponse.json({ error: "Ratings object is required" }, { status: 400 });
    }

    const { usability, accuracy, support, overall } = ratings;
    const validateRating = (val: any) => typeof val === "number" && val >= 1 && val <= 5;

    if (!validateRating(usability) || !validateRating(accuracy) || !validateRating(support) || !validateRating(overall)) {
      return NextResponse.json({ error: "All ratings must be numbers between 1 and 5" }, { status: 400 });
    }

    if (!comment || typeof comment !== "string" || comment.trim().length === 0) {
      return NextResponse.json({ error: "Feedback comment is required" }, { status: 400 });
    }

    // Verified Feedback Loop logic
    const companyLower = customerCompany.trim().toLowerCase();
    let verified = VERIFIED_COMPANIES.includes(companyLower);

    if (!verified) {
      const inquiries = await getInquiries();
      verified = inquiries.some((inq) => inq.customerCompany.toLowerCase() === companyLower);
    }

    const newReview = await addReview({
      customerName: customerName.trim(),
      customerCompany: customerCompany.trim(),
      ratings: {
        usability,
        accuracy,
        support,
        overall,
      },
      comment: comment.trim(),
      verified,
    });

    await addSystemLog(
      "info",
      `New review submitted by ${customerName.trim()} (${customerCompany.trim()}) - Rating: ${overall}/5, Verified: ${verified}`
    );

    return NextResponse.json({
      success: true,
      review: newReview,
    });
  } catch (error: any) {
    console.error("Error processing review:", error);
    await addSystemLog("error", `Failed to process review: ${error.message || error}`);
    return NextResponse.json({ error: "Failed to process review" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const list = await getReviews();
    return NextResponse.json({ success: true, reviews: list });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
