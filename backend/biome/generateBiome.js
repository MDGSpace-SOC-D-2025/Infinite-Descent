import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";


const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY_BIO,
});

router.post("/generate-biome", async (req, res) => {
  try {
    const { floor } = req.body;

    const prompt = `
You are a game designer for a dark roguelike dungeon crawler.

Generate a SINGLE biome definition as STRICT JSON.
No markdown. No explanation.

Rules:
- Floor and wall colors must be dark and atmospheric
- Values between 0 and 1 where applicable
- Biome must feel visually distinct
- Suitable for top-down pixel-art game

Return JSON only with this schema:
{
  biome: string,
  floor: { color: string, noise: number },
  wall: { color: string, density: number },
  decor: { cracks: number, bones: number },
  lighting: { ambient: number, fog: boolean, tint: string }
}

Dungeon depth: ${floor}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log(prompt)

    const text = response.text.trim();
    const biomeConfig = JSON.parse(text);

    res.json(biomeConfig);

  } catch (err) {
    console.error("Biome generation failed:", err);
    res.status(500).json({ error: "Biome generation failed" });
  }
});

export default router;
