import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';
import Title from './Title';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import Beach from '../assets/Beach.png';
import Desert from '../assets/Desert.png';
import Mountain from '../assets/Mountain.png';

const CategoriesSlider = () => {
    // Three real categories — matching the values the Collection page filters on —
    // repeated so the loop-carousel has enough slides to feel continuous.
    const base = [
        { title: "Mountains", image: Mountain },
        { title: "Deserts", image: Desert },
        { title: "Beach", image: Beach },
    ];
    const categories = [...base, ...base, ...base];

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="w-full max-w-[1320px] mx-auto py-14 px-4 flex flex-col gap-8 relative">
                <div className="w-full flex flex-wrap items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <Title text1={"Travel"} text2={"categories"} />
                        <p className="text-[#221A10]/55 font-light text-sm md:text-base max-w-md">
                            Every journey we run falls into one of three worlds — pick yours.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button ref={prevRef} aria-label="Previous"
                            className="w-11 h-11 grid place-items-center border border-[#221A10]/20 text-[#221A10]/60 hover:border-[#C2913B] hover:text-[#C2913B] transition-colors">
                            <FaArrowLeft size={14} />
                        </button>
                        <button ref={nextRef} aria-label="Next"
                            className="w-11 h-11 grid place-items-center border border-[#221A10]/20 text-[#221A10]/60 hover:border-[#C2913B] hover:text-[#C2913B] transition-colors">
                            <FaArrowRight size={14} />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    loop={true}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    spaceBetween={16}
                    breakpoints={{
                        0: { slidesPerView: 1.4, spaceBetween: 12 },
                        640: { slidesPerView: 2.2, spaceBetween: 16 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                    }}
                    className="w-full"
                >
                    {categories.map((category, index) => (
                        <SwiperSlide key={index}>
                            <Link to="/collection" className="group block relative h-[320px] overflow-hidden">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#221A10]/75 via-[#221A10]/10 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                                    <h3 className="teko text-3xl text-[#FBF7EE]">{category.title}</h3>
                                    <span className="eyebrow text-[9px] text-[#E3B95C] opacity-0 group-hover:opacity-100 transition-opacity">Explore →</span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};

export default CategoriesSlider;
