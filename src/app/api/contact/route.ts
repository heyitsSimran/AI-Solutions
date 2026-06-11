import { NextResponse } from "next/server";
import { addInquiry, addSentEmail, addSystemLog } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      customerCountry,
      customerTitle,
      requirements,
    } = body;

    // Field Validation
    if (!customerName || typeof customerName !== "string" || customerName.trim().length === 0) {
      return NextResponse.json({ error: "Customer Name is required" }, { status: 400 });
    }
    if (!customerEmail || typeof customerEmail !== "string" || !customerEmail.includes("@")) {
      return NextResponse.json({ error: "A valid Customer Email Address is required" }, { status: 400 });
    }
    if (!customerPhone || typeof customerPhone !== "string" || customerPhone.trim().length < 5) {
      return NextResponse.json({ error: "Customer Phone Number is required" }, { status: 400 });
    }
    if (!customerCompany || typeof customerCompany !== "string" || customerCompany.trim().length === 0) {
      return NextResponse.json({ error: "Customer Company Name is required" }, { status: 400 });
    }
    if (!customerCountry || typeof customerCountry !== "string" || customerCountry.trim().length === 0) {
      return NextResponse.json({ error: "Customer Country is required" }, { status: 400 });
    }
    if (!customerTitle || typeof customerTitle !== "string" || customerTitle.trim().length === 0) {
      return NextResponse.json({ error: "Customer Title is required" }, { status: 400 });
    }
    if (!requirements || typeof requirements !== "string" || requirements.trim().length < 10) {
      return NextResponse.json({ error: "Detailed Job/Project Requirements are required (min 10 chars)" }, { status: 400 });
    }

    // Generate confirmation token
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let randomToken = "";
    for (let i = 0; i < 6; i++) {
      randomToken += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const token = `CONF-${randomToken}`;

    // Save inquiry to Supabase
    const newInquiry = await addInquiry({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      customerCompany: customerCompany.trim(),
      customerCountry: customerCountry.trim(),
      customerTitle: customerTitle.trim(),
      requirements: requirements.trim(),
      token,
    });

    // Mock Email content
    const emailSubject = `AI-Solutions: Inquiry Confirmation [${token}]`;
    const emailBody = `
Dear ${customerName.trim()},

Thank you for contacting AI-Solutions. We have successfully received your project inquiry.

Here is your verification and confirmation token: ${token}

Inquiry Details:
------------------------------------------
Company: ${customerCompany.trim()}
Title: ${customerTitle.trim()}
Country: ${customerCountry.trim()}
Phone: ${customerPhone.trim()}
Requirements:
${requirements.trim()}
------------------------------------------

Our systems engineering team will review your requirements and follow up with you within 24 business hours.

Best Regards,
The AI-Solutions Automation Bot
Digital Employee Experience Platform
    `.trim();

    // Store in mock email outbox
    await addSentEmail(customerEmail.trim(), emailSubject, emailBody, token);

    // Create system log
    await addSystemLog("info", `Contact inquiry submitted by ${customerName.trim()} (${customerCompany.trim()}) - Token ${token} issued.`);

    return NextResponse.json({
      success: true,
      token,
      inquiry: newInquiry,
    });
  } catch (error: any) {
    console.error("Error processing contact inquiry:", error);
    await addSystemLog("error", `Failed to process contact inquiry: ${error.message || error}`);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
