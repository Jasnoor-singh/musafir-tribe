import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String,required:true},
    link:{type:String,required:true},
    price:{type:Number,required:true},
    originalPrice:{ type:Number, required:true, default:2000},
    image:{type:Array,required:true},
    video: { type: String },
    category:{type:String,required:true},
    subCategory:{type:String,required:true},
    // sizes:{type:Array},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},

    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
            name: { type: String, required: true }, // Name of the reviewer
            rating: { type: Number, required: true, min: 1, max: 5 }, // Rating out of 5
            comment: { type: String, required: true }, // Review text
            images: { type: Array }, // Optional review images
            videos: { type: Array }, // Optional review videos
            date: { type: Date, default: Date.now } // Timestamp
        }
    ]


})

const productModel = mongoose.models.productnew || mongoose.model("productnew",productSchema);

export default productModel;