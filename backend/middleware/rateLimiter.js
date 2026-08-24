import rateLimit from "express-rate-limit";

/**
 * Rate limiters — protect the endpoints an attacker would actually target.
 * Applied only to auth/write-sensitive routes so normal browsing traffic
 * (product listing, images) is never throttled.
 */

// Login / admin-login / register: slow down brute-force credential guessing.
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,                   // 20 attempts per IP per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many attempts. Please try again in a few minutes." },
});

// General API limiter — generous, just stops runaway scripts/bots.
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests. Please slow down." },
});
