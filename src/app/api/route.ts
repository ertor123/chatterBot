import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_KEY});

export async function POST(req: Request) {
  try {
    // Check if API key is configured
    if (!process.env.OPENAI_KEY) {
      console.error("API key missing");
      return NextResponse.json(
        { error: "OpenAI API key not configured" }, 
        { status: 500 }
      );
    }

    const body = await req.json();
    
    // Validate request body
    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" }, 
        { status: 400 }
      );
    }

    console.log("Calling OpenAI API with model: gpt-4o-mini");
    console.log("Messages count:", body.messages.length);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: body.messages,
      max_tokens: 500, // Limit response length
      temperature: 0.7, // Control creativity
    });
    
    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No response from OpenAI");
    }

    const theResponse = completion.choices[0].message;
    console.log("OpenAI responded successfully");

    return NextResponse.json({ output: theResponse }, { status: 200 });
    
  } catch (error) {
    console.error("OpenAI API error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle specific OpenAI errors
    if (errorMessage.includes('429')) {
      return NextResponse.json(
        { error: "Rate limit exceeded", details: "Please try again later or check your OpenAI billing." }, 
        { status: 429 }
      );
    }
    
    if (errorMessage.includes('401')) {
      return NextResponse.json(
        { error: "Invalid API key", details: "Please check your OpenAI API key." }, 
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get response from OpenAI", details: errorMessage }, 
      { status: 500 }
    );
  }
};