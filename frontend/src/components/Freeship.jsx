// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const Freeship = () => {
//   const location = useLocation();
//   if (location.pathname === '/login') {
//     // className = 'hidden';
//     return null;
//   }
//   return (
//     <div className="  sm:text-sm bg-black text-orange-500 text-center py-1 px-4 sm:px-6 md:px-8 font-semibold  md:text-lg w-full">
//       <p className='text-sm'>Free Shipping on Orders of Rs. 200 and Above</p>
//     </div>
//   );
// }

// export default Freeship;


import React from 'react';
import { useLocation } from 'react-router-dom';

const Freeship = () => {
  const location = useLocation();
  if (location.pathname === '/login') {
    return null;
  }
  return (
    <div className="sm:text-sm bg-black text-white text-center py-1 px-4 sm:px-6 md:px-8 font-semibold md:text-lg w-full overflow-hidden">
      <div className="relative flex gap-20">
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
        <p className="text-sm whitespace-nowrap animate-scroll">
          Special Discount Offers for Group Travellors
        </p>
      </div>
    </div>
  );
};

export default Freeship;
