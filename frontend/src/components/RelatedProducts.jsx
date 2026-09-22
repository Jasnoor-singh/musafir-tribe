import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContextValue'
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({category,subCategory,excludeId}) => {
    const {products} =useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productsCopy= products.slice();
            productsCopy=productsCopy.filter((item)=>category===item.category && item._id !== excludeId)
            productsCopy=productsCopy.filter((item)=>subCategory===item.subCategory)

            setRelated(productsCopy.slice(0,4))
        }
    },[products, category, subCategory, excludeId])

  if (!related.length) return null;
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'JOURNEYS'}/>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 lg:mt-10'>
            {
                related.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name}
                    price={item.price}
                    originalPrice={item.originalPrice}
                    image={item.image}/>
                ))
            }
        </div>

    </div>
  )
}

export default RelatedProducts
RelatedProducts.propTypes = {category: PropTypes.string, subCategory: PropTypes.string, excludeId: PropTypes.string};
