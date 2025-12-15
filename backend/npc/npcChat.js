import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/npc-chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    // Fixed prompt with proper formatting
    const prompt = `You are an ancient dungeon spirit in a roguelike game. You give cryptic but helpful responses. Never mention AI or modern concepts. PLAYER SAYS: "${message}"`;

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Missing Gemini API key in .env file"
      });
    }

    // CORRECT Gemini API URL format with API key in query parameter
    const apiUrl =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;


    console.log("🤖 Sending to Gemini API...");

    // Make request to Gemini API with correct format
    const geminiRes = await axios.post(
      apiUrl,
      { 
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    console.log("✅ Got response from Gemini");

    // Extract response from Gemini's response structure
    const reply = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text 
      || "The spirit remains silent...";

    res.json({ reply });

  } catch (error) {
    console.error("❌ NPC Chat Error:", error.response?.data || error.message);
    
    // Send helpful error message to client
    let errorMessage = "The dungeon spirit seems disturbed...";
    
    if (error.response?.status === 401) {
      errorMessage = "Invalid API key. Check your GEMINI_API_KEY in .env file.";
    } else if (error.response?.status === 429) {
      errorMessage = "Too many requests. The spirit is overwhelmed.";
    }
    
    res.status(500).json({
      reply: errorMessage,
      error: error.message
    });
  }
});

export default router;