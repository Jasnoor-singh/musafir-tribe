// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import { assets } from '../assets/frontend_assets/assets';
// import CartTotal from '../components/CartTotal';
// import Button from '../components/Button';

// const Cart = () => {

//   const{products,currency,cartItems,updateQuantity,navigate}=useContext(ShopContext)
//   const[cartData,setCartData]=useState([]);

//   useEffect(() => {
//     const tempData = [];
  
//     for (const itemId in cartItems) {
//       const quantity = cartItems[itemId];
//       if (quantity > 0) {
//         tempData.push({
//           _id: itemId,
//           quantity: quantity
//         });
//       }
//     }
  
//     setCartData(tempData);
//   }, [cartItems]);
  

//       useEffect(()=>{
//         console.log(cartData);
        
//       },[cartData])



//   return (
//     <div className='border-t pt-14'>
//      <div className='text-2xl mb-3'>
//         <Title text1={'Your'} text2={'Cart'}/>
//      </div>
//      <div>
//       {
//         cartData.map((item,index)=>{
//           const productData = products.find((product)=>product._id===item._id);
          
//           return(
//               <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
//                   <div className='flex items-start gap-6'>
//                     <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
//                     <p className='text-xs sm:text-lg font-medium'>{productData.name}
//                     <div className='flex item-start gap-5 mt-2'>
//                         <p>{currency}{productData.price}</p>
//                         {/* <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p> */}
//                     </div>
//                     </p>
                    
                    
//                   </div>

//                   <input type="number" min={0} defaultValue={item.quantity}
//                   onChange={(e)=>e.target.value==='' || e.target.value===0 ? null : updateQuantity(item._id,Number(e.target.value))}
//                   className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
//                   <img src={assets.bin_icon} alt="" className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={()=>(updateQuantity(item._id,0))} />
                  
                  
//               </div>
//           )
//         })
//       }
//      </div>
//      <div className='flex justify-end my-20'>
//       <div className='w-full sm:w-[450px]'>
//       <CartTotal/>
//       <div className='w-full text-end'>
//       <Button className=' text-sm my-8 
//       'onClick={()=>navigate("/place-order")}>PROCEED TO CHECKOUT</Button>
//       </div>
//       </div>
         
//      </div>
    
//     </div>
    
//   )
// }

// export default Cart


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import Button from '../components/Button';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Update cart data based on cartItems
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        tempData.push({
          _id: itemId,
          quantity: quantity,
        });
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3 mt-12">
        <Title text1={'Your'} text2={'Wishlist'} />
      </div>

      {/* Check if cart is empty */}
      {cartData.length === 0 ? (
        <div className="text-center text-gray-500 mt-15 flex flex-col items-center sm:flex-row sm:justify-center sm:items-center" >
    <img
      src={assets.empty}
      alt="Empty Cart"
      className="w-48 lg:w-96 sm:w-48 sm:mr-6 mb-4 sm:mb-0"
    />
    <div>
      <p className="mb-4">Your cart is empty.</p>
      <Button className="bg-blue-500 text-white" onClick={() => navigate('/')}>
        Continue Tripping
      </Button>
    </div>
  </div>
  
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            // Handle missing product data gracefully
            if (!productData) {
              return (
                <div key={item._id} className="py-4 text-red-500">
                  Trips not found.
                </div>
                
              );
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img src={productData.image[0]} alt="" className="w-16 sm:w-20" />
                  <p className="text-xs sm:text-lg font-medium">
                    {productData.name}
                    <div className="flex item-start gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                    </div>
                  </p>
                </div>

                {/* <input
                  type="number"
                  min={0}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === 0
                      ? null
                      : updateQuantity(item._id, Number(e.target.value))
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                /> */}
                <img
                  src={assets.bin_icon}
                  alt=""
                  className="w-4 lg:ml-72  sm:w-5 cursor-pointer"
                  onClick={() => updateQuantity(item._id, 0)}
                />
              </div>
            );
          })}
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          {/* <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <Button
                className={`text-sm my-8 ${cartData.length === 0 ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                disabled={cartData.length === 0}
                onClick={() => navigate('/place-order')}
              >
                PROCEED TO CHECKOUT
              </Button>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Cart;
