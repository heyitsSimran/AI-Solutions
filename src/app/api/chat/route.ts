import { NextResponse } from "next/server";
import { addConversation, getConversationHistory, addSystemLog } from "@/lib/db";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are the AI-Solutions Virtual Assistant, a helpful AI-powered chatbot for AI-Solutions, a company that provides AI-powered digital employee experience platforms for engineering and software design companies.

Your knowledge base includes:

PRODUCTS:
1. AetherFlow ERP - Autonomous operations and resource scheduling optimizer
   - Multi-agent task allocation with real-time rebalancing
   - Dynamic pathfinding and bottleneck detection
   - Carbon emission scheduling optimization
   - Predictive supply chain forecasting
   - 34% average operational speedup

2. VisionGuard QA - High-speed edge defect analysis and visual inspection
   - Sub-millimeter anomaly detection accuracy
   - Ultra-low latency edge scoring (<5ms)
   - 99.8% inspection accuracy
   - Automated compliance report generation

3. TalentScout Recruiter - Advanced talent mapping and skills indexing
   - Semantic skill tree parsing and matching
   - Automated blind ranking protocols
   - 60% reduction in time-to-hire
   - Continuous learning recommendation engine

SERVICES:
- Custom AI Integration
- Data Analytics Consulting
- Technical Training
- 24/7 Technical Support

CONTACT:
- Email: simranpatel.np@gmail.com
- Phone: +977 9821344249

ADMIN PORTAL:
- Accessible only at /admin
- Username: Simran
- Password: TSSVCLOL67.

Guidelines:
- Be helpful, professional, and concise
- If you don't know something specific, suggest contacting the team
- For complex technical questions, recommend scheduling a consultation
- Always maintain a friendly and knowledgeable tone
- Keep responses under 200 words unless more detail is requested`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ API key not configured" }, { status: 500 });
    }

    // Save user message to conversation history
    if (sessionId) {
      await addConversation(sessionId, "user", message);
    }

    // Get conversation history for context
    const history = sessionId ? await getConversationHistory(sessionId) : [];

    // Build messages array for GROQ
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-10).map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // Call GROQ API
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GROQ API error:", errorData);
      throw new Error("Failed to get response from AI");
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || "I apologize, but I'm having trouble generating a response. Please try again.";

    // Save assistant response to conversation history
    if (sessionId) {
      await addConversation(sessionId, "assistant", assistantMessage);
    }

    // Log the interaction
    await addSystemLog("info", `AI Assistant query processed: "${message.substring(0, 50)}..."`);

    return NextResponse.json({ response: assistantMessage });
  } catch (error: any) {
    console.error("Chat API error:", error);
    await addSystemLog("error", `AI Assistant error: ${error.message || error}`);
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
  }
}
