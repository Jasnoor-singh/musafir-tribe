import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

/**
 * GET /api/admin/stats  (adminAuth)
 * One call powers the whole admin dashboard:
 * counts, revenue, trips by category, and the latest orders.
 */
const getDashboardStats = async (req, res) => {
    try {
        const [totalTrips, totalOrders, totalUsers, orders, categoryAgg] =
            await Promise.all([
                productModel.countDocuments(),
                orderModel.countDocuments(),
                userModel.countDocuments(),
                orderModel.find({}).sort({ date: -1 }).limit(6),
                productModel.aggregate([
                    { $group: { _id: "$category", count: { $sum: 1 } } },
                    { $sort: { count: -1 } },
                ]),
            ]);

        const revenueAgg = await orderModel.aggregate([
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const pendingOrders = await orderModel.countDocuments({
            status: { $nin: ["Delivered", "Completed", "Cancelled"] },
        });

        res.json({
            success: true,
            stats: {
                totalTrips,
                totalOrders,
                totalUsers,
                pendingOrders,
                totalRevenue: revenueAgg[0]?.total || 0,
                tripsByCategory: categoryAgg.map((c) => ({
                    category: c._id || "Uncategorised",
                    count: c.count,
                })),
                recentOrders: orders,
            },
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { getDashboardStats };
