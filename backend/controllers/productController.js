import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
//function-addproduct

const addProduct = async (req, res) => {
    try {
        const { name, description,link, price,originalPrice, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const video =  req.files.video && req.files.video[0];


        const images = [image1, image2, image3, image4].filter((item) => item != undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )
        let videoUrl = "";
        if (video) {
            const videoResult = await cloudinary.uploader.upload(video.path, { resource_type: "video" });
            videoUrl = videoResult.secure_url;
        }

        // console.log(name, description, price, category, subCategory, sizes, bestseller);

        // console.log(req.files);
        // console.log(req.body);


        // console.log(imagesUrl)

        const productData = {
            name,
            description,
            link,
            price:Number(price),
            originalPrice :Number(originalPrice),
            image : imagesUrl,
            video : videoUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller:bestseller ==="true"  ? true : false,
           date: Date.now(),


        }

        // console.log(productData);

        const product = new productModel(productData)
        await product.save();
        

        res.json({success:true,message:"Product Added "})


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//function-list product

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});

        const productsWithDefaultPrice = products.map(product => ({
            ...product._doc,
            originalPrice: product.originalPrice || product.price // Use 2000 if originalPrice is undefined
        }));
        res.json({success:true,products : productsWithDefaultPrice})
        // console.log(products);
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//function-remove product

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

//function-single product info

const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

export const addReview = async (req, res) => {
    try {
        const { id } = req.params; // Product ID
        const { rating, comment } = req.body;
        const userId = req.user.id; 
        // console.log(req.body);
        // console.log(userId)
        // console.log(req.files)

        // Retrieve user details from userModel
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const name = user.name; // Extract user's name

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const video = req.files?.video && req.files.video[0];
        


        const images = [image1, image2].filter((item) => item != undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
                return result.secure_url
            })
        )
        // Handle image uploads if any
        const videos = [video].filter(Boolean);
        let videoUrl = await Promise.all(
        videos.map(async (item) => {
            const videoResult = await cloudinary.uploader.upload(video.path, { resource_type: "video" })
            return videoResult.secure_url;
        })
    )

        // Add review to the product
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = { userId, name, rating, comment, images: imagesUrl,videos: videoUrl };
        console.log(review);
        
        product.reviews.push(review);

        await product.save();
        res.status(200).json({ message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};




export const getReviews = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productModel.findById(id).select("reviews");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product.reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};








//function-update product

const updateProduct = async (req, res) => {
    try {
        const { id, name, description, link, price, originalPrice, category, subCategory } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (link !== undefined) product.link = link;
        if (price !== undefined && price !== "") product.price = Number(price);
        if (originalPrice !== undefined && originalPrice !== "") product.originalPrice = Number(originalPrice);
        if (category !== undefined) product.category = category;
        if (subCategory !== undefined) product.subCategory = subCategory;

        // Optionally replace images if new ones are uploaded
        const files = req.files || {};
        const newImages = [files.image1, files.image2, files.image3, files.image4]
            .map((f) => f && f[0])
            .filter(Boolean);

        if (newImages.length > 0) {
            const imagesUrl = await Promise.all(
                newImages.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                    return result.secure_url;
                })
            );
            product.image = imagesUrl;
        }

        await product.save();
        res.json({ success: true, message: "Product Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct };