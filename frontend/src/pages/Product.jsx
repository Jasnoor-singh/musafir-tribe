import { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContextValue';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../components/RelatedProducts';
import Button from '../components/Button';
import CatalogueState from '../components/CatalogueState';
import ProductReviews from '../components/Review';
import BookNowForm from '../components/BookNowForm';
import galleryImage1 from '../assets/download (1).jpeg';
import galleryImage2 from '../assets/download (2).jpeg';
import galleryImage3 from '../assets/download (3).jpeg';
import galleryImage4 from '../assets/download.jpeg';
import galleryImage5 from '../assets/licensed-image.jpeg';

const Product = () => {
  const { productId } = useParams();
  const { products, productsLoading, productsError, currency, addToCart, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [showBooking, setShowBooking] = useState(false);

  const calculateDiscount = () => {
    if (productData && productData.originalPrice && productData.price) {
      const discount = ((productData.originalPrice - productData.price) / productData.originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const discount = calculateDiscount();

  useEffect(() => {
    const found = products.find(item => item._id === productId);
    setProductData(found || false);
    setImage(found?.image?.[0] || '');
    setShowBooking(false);
  }, [productId, products]);

  return productData ? (
    <div className="pt-12 sm:pt-16 transition-opacity ease-in duration-500 opacity-100">
      {/* Added pt-20 to add space for the fixed navbar */}

      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                alt=""
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border border-orange-500 rounded-md"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt={productData.name} className="w-full aspect-[4/3] object-cover rounded-lg" />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1 rounded-md">
          <h1 className="font-bold text-2xl sm:text-2xl lg:text-3xl mt-2 capitalize text-orange-950">{productData.name}</h1>
          <div className="flex gap-x-2">
            <p className="mt-5 text-2xl font-bold flex items-center">{currency}{productData.price}</p>
            {discount > 0 && <p className="mt-5 text-sm text-gray-500 line-through flex items-center">{currency}{productData.originalPrice}</p>}
            {discount > 0 && <p className="mt-5 text-sm text-green-600 flex items-center">({discount}% off)</p>}
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5 text-sm lg:text-md">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8"></div>
          <div className="flex flex-wrap gap-4">
            <Button
              className="text-sm"
              onClick={() => setShowBooking(true)}
            >
              BOOK NOW
            </Button>
            <Button
              className="text-sm"
              onClick={async () => {
                if (await addToCart(productData._id)) navigate("/cart");
              }}
            >
              ADD TO WISHLIST
            </Button>
            {/^https?:\/\//.test(productData.link || '') && <a className="px-5 py-3 border border-[#221A10]/30 rounded text-sm" href={productData.link} target="_blank" rel="noopener noreferrer">VIEW BROCHURE</a>}
          </div>

          <hr className="mt-8 sm:4/5" />
        </div>
      </div>

      <hr className="mt-8 lg:mt-16 lg:my-12 sm:4/5" />

      {/* Gallery Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">From our gallery</h2>
        <p className="text-gray-500 mb-8">Check out these beautiful destinations captured by our community.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[galleryImage1, galleryImage2, galleryImage3, galleryImage4, galleryImage5].map((image, index) => (
            <img
              src={image}
              alt={`Gallery ${index}`}
              key={index}
              className="w-full h-40 object-cover rounded-md shadow-sm hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      </div>

      <hr className="mt-16 lg:my-12" />

      {/* Description & Review Section */}
      <ProductReviews productId={productId} />

      {/* Display Related Products */}
      <RelatedProducts excludeId={productId} category={productData.category} subCategory={productData.subCategory} />

      {/* Book Now enquiry modal */}
      <BookNowForm
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        productId={productData._id}
        packageName={productData.name}
        price={productData.price}
        currency={currency}
      />
    </div>
  ) : (
    <div className="py-16 min-h-[50vh]">{productsLoading || productsError ? <CatalogueState /> : <div className="text-center"><h1 className="teko text-4xl">Journey not found</h1><p className="my-5">This journey is no longer available.</p><Button onClick={() => navigate('/collection')}>Explore journeys</Button></div>}</div>
  );
};

export default Product;
