import express from "express";

import cors from "cors";
import dotenv from "dotenv"
import npcChatRouter from "./npc/npcChat.js";

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api",npcChatRouter)

const PORT=3001;
app.listen(PORT,()=>{
    console.log(`backend ${PORT}`);
})