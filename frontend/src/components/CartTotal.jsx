import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(ShopContext);

  // Logic for Free Shipping
  const isFreeShipping = getCartAmount() > 200;
  const finalDeliveryFee = isFreeShipping ? 0 : delivery_fee;

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        {/* Subtotal */}
        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr />

        {/* Shipping Fee */}
        <div className='flex justify-between items-center'>
          <p>Shipping Fee</p>
          {isFreeShipping ? (
            <div className='flex items-center gap-2'>
              <p className='line-through text-gray-400'>{currency}{delivery_fee}.00</p>
              <p className='text-green-600 font-semibold'>Free Shipping</p>
            </div>
          ) : (
            <p>{currency}{delivery_fee}.00</p>
          )}
        </div>
        <hr />

        {/* Total */}
        <div className='flex justify-between'>
          <b>Total</b>
          <b>
            {currency}
            {getCartAmount() === 0 ? 0 : getCartAmount() + finalDeliveryFee}.00
          </b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal;
