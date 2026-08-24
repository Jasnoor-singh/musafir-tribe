import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getDashboardStats } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/stats", adminAuth, getDashboardStats);

export default adminRouter;
