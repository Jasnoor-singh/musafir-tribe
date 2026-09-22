import express from "express"
import {placeOrder,placeOrderRazorpay,allOrders,userOrders,updateStatus,  verifyRazorpay} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"


import validateOrder from "../middleware/validateOrder.js"

const orderRouter = express.Router()

// Admin Features

orderRouter.post("/list",adminAuth,allOrders)
orderRouter.post("/status",adminAuth,updateStatus)

// Payment Features

orderRouter.post("/place",authUser,validateOrder,placeOrder)
orderRouter.post("/razorpay",authUser,validateOrder,placeOrderRazorpay)

// UserFeature

orderRouter.post("/userorders",authUser,userOrders)

//verify Payment

orderRouter.post("/verifyRazorpay",authUser,verifyRazorpay)

export default orderRouter;
