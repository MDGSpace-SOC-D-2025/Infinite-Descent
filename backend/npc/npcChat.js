import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const router = express.Router();


const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY,

});

router.post("/npc-chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({
        reply: "write shit.."
      });
    }

    const prompt = `you are an npc and will help to guide the player by replying players message and the  Player message is : "${message}"`;


    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    
    const reply =
      response.text || "hohoh";

    res.json({ reply });

  } catch (error) {
    console.error(" Gemini SDK Error:", error);

    res.status(500).json({
      reply: "problem in api "
    });
  }
});

export default router;
