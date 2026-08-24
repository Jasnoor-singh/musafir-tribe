import express from "express";
import { addProduct,addReview,getReviews,listProducts,removeProduct,singleProduct,updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const productRouter = express.Router();

// productRouter.post("/add",
//      // upload.fields([
//      //      {name:"image1",maxCount:1},   {name:"image2",maxCount:1},
//      //      {name:"image3",maxCount:1},{name:"image4",maxCount:1}]),

//           upload.single("image"),
//           addProduct);

productRouter.post("/add",adminAuth,
     upload.fields([
          {name:"image1",maxCount:1},   {name:"image2",maxCount:1},
          {name:"image3",maxCount:1},{name:"image4",maxCount:1},
     {name:"video", maxCount:1}]),addProduct

)
productRouter.post("/update",adminAuth,
     upload.fields([
          {name:"image1",maxCount:1},   {name:"image2",maxCount:1},
          {name:"image3",maxCount:1},{name:"image4",maxCount:1}]),updateProduct
);
productRouter.post("/remove",adminAuth,removeProduct);
productRouter.post("/single",adminAuth,singleProduct);
productRouter.get("/list",listProducts);

productRouter.post("/:id/reviews",authUser,upload.fields([
     {name:"image1",maxCount:1},   {name:"image2",maxCount:1},
     { name: "video", maxCount: 1 }]),addReview); // Add review to a product
productRouter.get("/:id/reviews",authUser,getReviews); // Get reviews for a product


export default productRouter;