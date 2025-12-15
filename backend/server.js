import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import npcChatRouter from "./npc/npcChat.js";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite dev server
    credentials: true
}));

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Mount the NPC chat router
app.use("/api", npcChatRouter);

// Test endpoint
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "OK", 
        message: "Backend is running!",
        env: {
            hasGeminiUrl: !!process.env.GEMINI_URL,
            hasGeminiKey: !!process.env.GEMINI_API_KEY
        }
    });
});

// 404 handler
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.path}`);
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Internal server error", message: err.message });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    console.log(`✅ NPC Chat: http://localhost:${PORT}/api/npc-chat`);
    
    // Check environment variables
    if (!process.env.GEMINI_URL) {
        console.warn("⚠️  WARNING: GEMINI_URL not set in .env");
    }
    if (!process.env.GEMINI_API_KEY) {
        console.warn("⚠️  WARNING: GEMINI_API_KEY not set in .env");
    }
});