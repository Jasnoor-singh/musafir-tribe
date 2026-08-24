import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation module styles
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="my-10 p-2">
        <div className="w-full flex flex-wrap items-center justify-between">
          <div className="mb-8 flex flex-col gap-2 w-full lg:w-1/2">
            <Title
              className="text-2xl md:text-3xl font-bold text-gray-800"
              text1={"Weekend"}
              text2={"Getaways"}
            />
            <p className="text-gray-600 w-full lg:w-3/4 text-sm md:text-base">
              Here are lots of interesting destinations to visit, but don’t be
              confused—they’re already grouped by category.
            </p>
          </div>
          <div className="flex justify-start sm:justify-start lg:justify-end items-center gap-4 w-full lg:w-1/2 mb-4">
            <button
              ref={prevRef}
              className="prev-arrow bg-[#C2913B] text-black group hover:text-[#C2913B] hover:bg-black transition-transform duration-300 p-3 md:p-4 rounded-full ease-in-out teko border border-[#C2913B] text-sm md:text-xl tracking-wider"
              aria-label="Previous"
            >
              <FaArrowLeft />
            </button>
            <button
              ref={nextRef}
              className="next-arrow bg-[#C2913B] text-black group hover:text-[#C2913B] hover:bg-black transition-transform duration-300 p-3 md:p-4 rounded-full ease-in-out teko border border-[#C2913B] text-sm md:text-xl tracking-wider"
              aria-label="Next"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 40 },
          }}
          onBeforeInit={(swiper) => {
            // Assign navigation buttons before initializing Swiper
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          className="w-full"
        >
          {latestProducts.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div key={index} className="">
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  reviews={item.reviews}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default LatestCollection;
