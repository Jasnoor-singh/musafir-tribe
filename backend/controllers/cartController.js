// add products to user cart

import userModel from "../models/userModel.js";

// const addToCart  = async(req,res)=>{
//     try {
//         const{userId,itemId} = req.body;
//         const userData = await userModel.findById(userId)
//         let cartData =await userData.cartData;
//         if(cartData[itemId]){
//             if(cartData[itemId][size]){
//                 cartData[itemId][size]+=1
//             }else{
//                 cartData[itemId][size]=1
//             }
//         }else{
//             cartData[itemId]={}
//             cartData[itemId][size]=1
//         }

//         await userModel.findByIdAndUpdate(userId,{cartData})

//         res.json({success:true,message:"Added To Cart"})

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:error.message})
        
//     }
// }

// update user cart

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Fetch user data from the database
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Ensure cartData exists

        // Check if the item already exists in the cart
        if (cartData[itemId]) {
            cartData[itemId] += 1; // Increment the quantity
        } else {
            cartData[itemId] = 1; // Add the item with a quantity of 1
        }

        // Update the cart data in the database
        await userModel.findByIdAndUpdate(userId, { cartData });
        const pritdata = await userModel.findById(userId);
        console.log(pritdata);
        

        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};





const updateCart  = async(req,res)=>{
    try {
        const {userId,itemId,quantity} = req.body
        const userData = await userModel.findById(userId)
        let cartData =await userData.cartData;

        cartData[itemId]=quantity

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success:true,message:"Cart Updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// get user cart

const getUserCart  = async(req,res)=>{
    try {
        const {userId}=req.body
        const userData = await userModel.findById(userId)
        let cartData =await userData.cartData;
        res.json({success:true,cartData:cartData})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export{addToCart,updateCart,getUserCart}