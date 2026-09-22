//Placing orders using COD

// import { currency } from "../../admin/src/App.jsx"
import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import razorpay from "razorpay"

// global variables
const currency = "inr"
const deliveryCharge = 10

//gateway initialisation — only created if keys are present so the
//server doesn't crash when Razorpay are not configured yet.
const razorpayInstance = (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
    ? new razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    : null

const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address}= req.body

    const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
    }

    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
    
}

//Placing orders using Razorpay

const placeOrderRazorpay = async(req,res)=>{
    try {
        if (!razorpayInstance) return res.json({success:false,message:"Razorpay is not configured."})

        const {userId,items,amount,address}= req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount:amount*100,
            currency:currency.toUpperCase(),
            receipt:newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if (error) {
                console.log(error);
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
        })
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

const verifyRazorpay = async(req,res)=>{
    try {
        if (!razorpayInstance) return res.json({success:false,message:"Razorpay is not configured."})

        const {userId,razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if(orderInfo.status=="paid"){
            const order = await orderModel.findOne({_id:orderInfo.receipt,userId,paymentMethod:"Razorpay"});
            if (!order || orderInfo.amount !== Math.round(order.amount * 100) || orderInfo.currency !== "INR") return res.status(400).json({success:false,message:"Payment does not match this booking."});
            await orderModel.updateOne({_id:order._id,userId},{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:"Payment Successful"})
        }else{
            res.json({success:false,message:"Payment Failed"})
        }
        
    } catch (error) {
        console.log("Payment failed", error);
        res.json({success:false,message:error.message})
    }
}

//all orders data for admin panel

const allOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//User orders data for admin panel

const userOrders = async(req,res)=>{
    try {
        const {userId}=req.body 

        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//update order status from admin panel

const updateStatus = async(req,res)=>{
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {placeOrder,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyRazorpay};
