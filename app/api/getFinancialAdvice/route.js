// app/api/getFinancialAdvice/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { totalBudget, totalIncome, totalSpend } = await request.json();
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a friendly financial advisor. Based on:
      - Total Budget: $${totalBudget}
      - Total Income: $${totalIncome}
      - Total Spending: $${totalSpend}

      Provide ONE brief, practical piece of financial advice in a conversational tone. 
      Focus on one key insight or recommendation.
      Keep it under 2 sentences and avoid any calculations or numbers.
      Make it personal and actionable.
      Do not use bullet points or asterisks.
    `;

    const result = await model.generateContent(prompt);
    const advice = result.response.text();
    
    return NextResponse.json({ advice });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Failed to generate advice' },
      { status: 500 }
    );
  }
}