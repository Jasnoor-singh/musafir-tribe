import { createContext, useEffect, useState } from "react";
// import {products} from "../assets/frontend_assets/assets"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{

    const currency = "₹ ";
    const delivery_fee = 10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({})
    const navigate =useNavigate()
    const [products,setProducts]=useState([]);
    const [token,setToken]=useState("")

    const addToCart = async(itemId)=>{

        // if(!size){
        //     toast.error('Select Product Size');
        //     return;
        // }

        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId]+=1}
            // if(cartData[itemId][size]){
            //     cartData[itemId][size]+=1
            // }
            // else{
            //     cartData[itemId][size]=1;
            // }   }
        else{
            // cartData[itemId]={};
            cartData[itemId]=1;
        }

        setCartItems(cartData);
        console.log(cartData);

        if(token){
            try {
                const response = await axios.post(backendUrl+"/api/cart/add",{itemId},{headers:{token}})
                if (response.data.message){
                    toast.success("Trip Added to Wishlist")
                }
                
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }


    }

    // const getCartCount =()=>{
    //     let totalCount= 0;
    //     for (const items in cartItems){
    //         for(const item in cartItems[items]){
    //             try {
    //                 if(cartItems[items][item]>0){
    //                     totalCount+=cartItems[items][item];
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //             toast.error(error.message)
    //             }
    //         }

    //     }
    //     return totalCount;
    // }

    const getCartCount = () => {
        let totalCount = 0;
    
        try {
            for (const itemId in cartItems) {
                const quantity = cartItems[itemId];
                if (quantity > 0) {
                    totalCount += quantity;
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    
        return totalCount;
    };
    

   const  updateQuantity =  async(itemId,quantity)=>{
        let cartData= structuredClone(cartItems);
        cartData[itemId]=quantity;
        setCartItems(cartData)
        if(token){
            try{
                const response =await axios.post(backendUrl+"/api/cart/update",{itemId,quantity},{headers:{token}})
                if(response.data.message){
                    toast.success("Wishlist Updated")
                }
            }catch(error){
                console.log(error);
                toast.error(error.message)
                
            }
        }
   }

   const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
        const quantity = cartItems[itemId];
        try {
            if (quantity > 0) {
                // Find the product details for the current itemId
                const itemInfo = products.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * quantity;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return totalAmount;
};


const getProductsData=async()=>{
    try {
        const response =await axios.get(backendUrl+"/api/product/list");
       if(response.data.success){
        setProducts(response.data.products)
        console.log(response.data.products)

       }else{
        toast.error(response.data.message)
       }
       
        
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}

    const value = {
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItems,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,token,setToken,setCartItems
    }

const getUserCart = async(token)=>{
    try {
        const response= await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}})

        if(response.data.success){
            setCartItems(response.data.cartData)
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }
}

useEffect(()=>{
    getProductsData();
},[])

useEffect(()=>{
    if (!token && localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        getUserCart(localStorage.getItem("token"));
    }
})
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )


}

export default ShopContextProvider;