import express from 'express';
import rateLimit from 'express-rate-limit';
import productModel from '../models/productModel.js';
import { sendBookingEmail, validateBooking } from '../services/bookingEmail.js';

const router = express.Router();
router.post('/confirm', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false,
  message: {success:false,message:'Too many booking attempts. Please try again later.'} }), async (req, res) => {
  let booking;
  try { booking = validateBooking(req.body); }
  catch (error) { return res.status(400).json({success:false,message:error.message}); }
  if (!process.env.RESEND_API_KEY) return res.status(503).json({success:false,message:'Online booking emails are not available yet. Please call us or email singhjasnoor1421@gmail.com.'});
  try {
    const trip = await productModel.findById(booking.productId).lean();
    if (!trip) return res.status(404).json({success:false,message:'This journey is no longer available.'});
    const result = await sendBookingEmail(booking, trip);
    res.json({success:true,reference:result.reference,message:'Your booking request has been sent. We will contact you to confirm the details.'});
  } catch (error) {
    console.error('Booking email failed:', error.name);
    res.status(502).json({success:false,message:'Your booking email could not be sent. Please retry or contact us directly.'});
  }
});
export default router;
