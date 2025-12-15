import express from "express";
import axios from "axios" ;

const router =express.Router();
router.post("/npc-chat",async(requestAnimationFrame,res)=>{
    const{message,context}=req.body;

    const prompt=`You are an ancient dungeon spirit in a roguelike game.You give cryptic but helpful responses.Never mention AI or modern concept plYER SAYS "${message}"`;

    const geminiRes=await axios.post(
        process.env.GEMINI_URL,
        {prompt},
        {
            headers:{
                Authorization:`Berer ${process.env.GEMINI_API_KEY}`,
            },
        }

    );
    res.json({
        reply:geminiRes.data.text
    });
});
export default router;