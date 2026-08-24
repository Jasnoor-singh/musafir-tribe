import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import Title from "./Title";

// Placeholder traveller quotes — swap these for real reviews as they come
// in. Kept honest (no fabricated photos/videos) using initials avatars.
const TESTIMONIALS = [
  {
    name: "Ritika Sharma",
    trip: "Manali & Solang Valley Adventure",
    rating: 5,
    quote: "Every detail was sorted before we even landed — stays, guide, transfers. Solang at sunrise alone was worth the trip.",
  },
  {
    name: "Arjun Mehta",
    trip: "Thar Desert Expedition, Jaisalmer",
    rating: 5,
    quote: "The desert camp at night was unreal. Our guide knew every dune by name. Musafir Tribe made a first-time trip feel effortless.",
  },
  {
    name: "Priya Nair",
    trip: "Goa Coastal Escape",
    rating: 4,
    quote: "Relaxed pace, great shack recommendations, and the sunset cruise was the highlight of our whole year.",
  },
  {
    name: "Karan Bedi",
    trip: "Badrinath Pilgrimage Trek",
    rating: 5,
    quote: "Well organised for a group of elders and young travellers alike. The acclimatisation stops made all the difference.",
  },
  {
    name: "Simran Kaur",
    trip: "Kedarkantha Winter Trek",
    rating: 5,
    quote: "Our trek leader was fantastic, gear was solid, and the summit sunrise is something I'm still telling everyone about.",
  },
];

const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Previous testimonial"
    className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center
               border border-[#221A10]/20 text-[#221A10]/60 bg-[#FBF7EE] hover:border-[#C2913B] hover:text-[#C2913B] transition-colors"
  >
    <FaArrowLeft size={14} />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Next testimonial"
    className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center
               border border-[#221A10]/20 text-[#221A10]/60 bg-[#FBF7EE] hover:border-[#C2913B] hover:text-[#C2913B] transition-colors"
  >
    <FaArrowRight size={14} />
  </button>
);

const initials = (name) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const TestimonialCard = ({ t }) => (
  <div className="px-3">
    <div className="bg-[#FFFDF8] border border-[#221A10]/10 p-8 sm:p-10 h-full flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#221A10] text-[#E3B95C] grid place-items-center serif text-xl mb-5">
        {initials(t.name)}
      </div>
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((r) => (
          <span key={r} className={`text-sm ${t.rating >= r ? "text-[#C2913B]" : "text-[#221A10]/15"}`}>★</span>
        ))}
      </div>
      <p className="text-[#221A10]/75 font-light italic leading-relaxed max-w-xl">
        "{t.quote}"
      </p>
      <div className="mt-6">
        <p className="teko text-lg text-[#221A10]">{t.name}</p>
        <p className="eyebrow text-[9px] text-[#221A10]/45 mt-1">{t.trip}</p>
      </div>
    </div>
  </div>
);

const HomeFeedback = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    dots: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-full px-4 text-center mt-16 lg:mt-24 max-w-[1320px] mx-auto relative">
        <Title text1={"Real people"} text2={"real stories"} />
        <p className="text-[#221A10]/55 font-light text-sm md:text-base max-w-md mx-auto mb-10">
          Hear it from travellers who packed their bags with us.
        </p>

        <div className="relative max-w-2xl mx-auto">
          <Slider ref={sliderRef} {...settings}>
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={i} t={t} />
            ))}
          </Slider>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeFeedback;
