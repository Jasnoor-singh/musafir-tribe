import productModel from '../models/productModel.js';
import { priceOrder } from '../services/orderValidation.js';

export default async function validateOrder(req, res, next) {
  try {
    const { items, address } = req.body;
    const fields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'country', 'zipcode', 'phone'];
    if (!address || fields.some(field => typeof address[field] !== 'string' || !address[field].trim())) {
      return res.status(400).json({ success: false, message: 'Complete all contact and address fields.' });
    }
    if (!Array.isArray(items) || !items.length || items.some(item => !/^[a-f\d]{24}$/i.test(item?._id || ''))) {
      return res.status(400).json({ success: false, message: 'Choose valid journeys before booking.' });
    }
    const products = await productModel.find({ _id: { $in: items.map(item => item._id) } }).lean();
    const priced = priceOrder(items, products);
    req.body.items = priced.items;
    req.body.amount = priced.amount;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}
