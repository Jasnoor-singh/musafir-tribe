import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { authLimiter, apiLimiter } from "./middleware/rateLimiter.js";

//App Config
const app = express();
const PORT = process.env.PORT || 4004;
const isProd = process.env.NODE_ENV === "production";

const databaseReady = connectDB();
databaseReady.catch((err) => console.log("MongoDB connection failed:", err.message));
connectCloudinary();

// Trust the platform's reverse proxy (Vercel/Render/etc.) so req.ip,
// rate-limiting, and secure-cookie logic all see the real client IP/protocol.
app.set("trust proxy", 1);

//Middlewares
app.use(helmet({ crossOriginResourcePolicy: false })); // security headers; CORP off so images/API serve cross-origin to the frontend
app.use(express.json({ limit: "10mb" }));

// CORS: in production, only your storefront + admin origins may call the API.
// Set ALLOWED_ORIGINS as a comma-separated list, e.g.
//   ALLOWED_ORIGINS=https://musafirtribe.com,https://admin.musafirtribe.com
// Left unset, it falls back to "allow all" — convenient for local development.
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : null;

app.use(cors({
    origin: allowedOrigins ?? true,
    credentials: true,
}));

// Generic API rate limit (skips nothing — cheap to compute, protects everything)
app.use("/api", apiLimiter);

// Tighter limit specifically on auth endpoints (brute-force protection)
app.use("/api/user/login", authLimiter);
app.use("/api/user/register", authLimiter);
app.use("/api/user/admin", authLimiter);

// Report dependency readiness rather than claiming a disconnected API is healthy.
// A serverless cold start must finish connecting before its first API response.
app.use("/api", async (req, res, next) => {
    try {
        await databaseReady;
        next();
    } catch {
        res.status(503).json({ success: false, message: "The database is unavailable. Please try again shortly." });
    }
});
app.get("/api/health", (req, res) => {
    const ready = mongoose.connection.readyState === 1;
    res.status(ready ? 200 : 503).json({ success: ready, status: ready ? "ok" : "unavailable", database: ready ? "connected" : "disconnected" });
});
app.use("/api", (req, res, next) => {
    if (mongoose.connection.readyState !== 1) return res.status(503).json({success:false,message:"The database is unavailable. Please try again shortly."});
    next();
});

//api endpoints
app.use("/api/booking", bookingRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

// 404 — anything that didn't match a route above
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// Centralized error handler — must be last. Keeps stack traces out of
// responses in production while still logging them server-side.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: isProd ? "Something went wrong. Please try again." : err.message,
    });
});

if (!process.env.VERCEL) app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT} [${isProd ? "production" : "development"}]`);
});

export default app;
