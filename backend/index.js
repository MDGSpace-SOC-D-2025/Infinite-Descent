import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import npcChatRouter from "./npc/npcChat.js"

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res)=>{
    res.json({status:"ok"});
});

app.use("/api",npcChatRouter);

const PORT=process.env.PORT ||3001;
app.listen(PORT,()=>{
    console.log(`backend running on http://localhost:${PORT}`);
});

