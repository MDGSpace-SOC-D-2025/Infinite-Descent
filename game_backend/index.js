import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import npcChatRouter from "./npc/npcChat.js";
import generateBiomeRouter from "./biome/generateBiome.js";
import mongoDb from "./db/mongoDb.js";
import userRouter from "./routes/user.routes.js"



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

mongoDb()

// Register routes
app.use("/api", npcChatRouter);
app.use("/api", generateBiomeRouter);
app.use("/api/users",userRouter);

app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  res.status(statusCode).json({
    success:false,
    message:err.message||"ise",
    errors:err.errors||[]
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
