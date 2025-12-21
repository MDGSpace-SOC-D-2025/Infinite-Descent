import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import npcChatRouter from "./npc/npcChat.js";
import generateBiomeRouter from "./biome/generateBiome.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Register routes
app.use("/api", npcChatRouter);
app.use("/api", generateBiomeRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});