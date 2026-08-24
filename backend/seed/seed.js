/**
 * Seed script — fills the database with 6 ready-made journeys.
 *
 *   cd backend
 *   node seed/seed.js
 *
 * Uses the trip photos bundled in /backend/seed/images (the project's
 * own assets), uploads them to your Cloudinary, and inserts the trips.
 * Safe to re-run: it skips trips whose names already exist.
 */
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const img = (f) => path.join(__dirname, "images", f);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const TRIPS = [
    {
        name: "Manali & Solang Valley Adventure",
        category: "Mountains",
        price: 12999, originalPrice: 16999,
        image: img("mountain.png"),
        description:
            "Five days in the heart of Himachal — snow points at Solang, the Hadimba temple trail, riverside cafes in Old Manali, and a bonfire night under the deodars. Stays, transfers and a local guide included.",
    },
    {
        name: "Badrinath Pilgrimage Trek",
        category: "Mountains",
        price: 9499, originalPrice: 12499,
        image: img("temple.png"),
        description:
            "A guided six-day yatra to Badrinath with acclimatised halts at Joshimath, darshan assistance, and an optional sunrise hike to Mana village — the last village of India.",
    },
    {
        name: "Thar Desert Expedition, Jaisalmer",
        category: "Deserts",
        price: 10999, originalPrice: 13999,
        image: img("desert.png"),
        description:
            "Golden-city walks, camel safaris over the Sam dunes, a night in a luxury desert camp with folk music, and sunrise photography on the ridge. Four days, all meals at camp included.",
    },
    {
        name: "Goa Coastal Escape",
        category: "Beach",
        price: 14499, originalPrice: 18999,
        image: img("beach.png"),
        description:
            "Four easy days across North and South Goa — beach shacks at Anjuna, a sunset cruise on the Mandovi, spice-farm lunch, and a day kept free for the beach you like best.",
    },
    {
        name: "Paris City Lights Getaway",
        category: "Beach",
        price: 89999, originalPrice: 109999,
        image: img("eiffel.jpg"),
        description:
            "Six days in Paris — skip-the-line Eiffel Tower, the Louvre, a Seine dinner cruise and a day trip to Versailles. Includes 4-star stay, breakfasts, and airport transfers.",
    },
    {
        name: "Himalayan Sunrise Trek, Kedarkantha",
        category: "Mountains",
        price: 8499, originalPrice: 10999,
        image: img("tower.png"),
        description:
            "A beginner-friendly winter summit at 12,500 ft with pine-forest camps at Juda-ka-Talab, certified trek leaders, and the famous 360° summit sunrise. All camping gear provided.",
    },
];

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        for (const trip of TRIPS) {
            const exists = await productModel.findOne({ name: trip.name });
            if (exists) {
                console.log(`— skipped (already exists): ${trip.name}`);
                continue;
            }

            console.log(`Uploading image for: ${trip.name} ...`);
            const uploaded = await cloudinary.uploader.upload(trip.image, {
                resource_type: "image",
                folder: "musafir-tribe/trips",
            });

            await new productModel({
                name: trip.name,
                description: trip.description,
                link: "",
                price: trip.price,
                originalPrice: trip.originalPrice,
                image: [uploaded.secure_url],
                video: "",
                category: trip.category,
                subCategory: "Trip",
                sizes: [],
                bestseller: false,
                date: Date.now(),
            }).save();

            console.log(`✓ added: ${trip.name}`);
        }

        console.log("\nSeeding complete.");
        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err.message);
        process.exit(1);
    }
};

run();
