import mongoose from "mongoose";

/**
 * Connects to MongoDB using MONGODB_URI exactly as provided — the database
 * name belongs in the URI itself (e.g. .../musafirtribe?...), so nothing
 * is appended here. A short serverSelectionTimeout makes a bad/unreachable
 * URI fail fast with a clear error instead of hanging requests indefinitely.
 */
let connectionPromise;
mongoose.connection.on("connected", () => console.log("DB Connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB connection error:", err.message));

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return;
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 8000,
        }).finally(() => { connectionPromise = undefined; });
    }
    await connectionPromise;
};

export default connectDB;
