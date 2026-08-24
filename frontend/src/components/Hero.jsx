import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  const carouselVideos = [assets.vid2, assets.vid3];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 9000,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="w-full overflow-hidden relative">
      <Slider {...settings} className="relative">
        {carouselVideos.map((video, index) => (
          <div key={index} className="w-full h-[70vh] min-h-[420px] sm:h-[82vh] relative">
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Cinematic grade for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#221A10]/55 via-[#221A10]/25 to-[#221A10]/70 pointer-events-none" />

      {/* Statement */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <span className="eyebrow text-[10px] sm:text-xs text-[#E3B95C] mb-5">
          Curated journeys across India &amp; beyond
        </span>
        <h1 className="teko-head text-[#FBF7EE] text-5xl sm:text-7xl lg:text-8xl leading-[0.98] max-w-5xl">
          The world,
          <em className="font-light italic"> travelled well.</em>
        </h1>
        <p className="mt-6 text-[#FBF7EE]/85 text-sm sm:text-base max-w-xl font-light leading-relaxed">
          Hand-crafted expeditions to mountains, deserts and coastlines —
          planned end to end by people who have been there.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => navigate("/collection")}
            className="px-9 py-3.5 bg-[#C2913B] text-[#221A10] eyebrow text-xs rounded-sm border border-[#C2913B] hover:bg-transparent hover:text-[#E3B95C] transition-colors duration-300"
          >
            Explore journeys
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-9 py-3.5 eyebrow text-xs text-[#FBF7EE] border border-[#FBF7EE]/40 rounded-sm hover:border-[#E3B95C] hover:text-[#E3B95C] transition-colors duration-300"
          >
            Plan with us
          </button>
        </div>
      </div>

      {/* Hairline gold base rule */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#C2913B] to-transparent" />
    </div>
  );
};

export default Hero;
