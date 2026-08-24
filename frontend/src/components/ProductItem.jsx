import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

// Business WhatsApp number (country code + number, for wa.me)
const WHATSAPP_NUMBER = "918295699366";

const ProductItem = ({ id, image, name, price, originalPrice, reviews = [] }) => {
  const { currency } = useContext(ShopContext);

  const discount =
    originalPrice > 0 && price < originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const avgRating =
    Array.isArray(reviews) && reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const fmt = (n) => Number(n).toLocaleString("en-IN");

  const bookOnWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Hi! I'm interested in the "${name}" journey (${currency}${fmt(price)}). Could you share more details?`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="group flex flex-col bg-[#FFFDF8] border border-[#221A10]/10 overflow-hidden h-full
                    transition-all duration-300 hover:shadow-[0_24px_50px_rgba(34,26,16,0.14)] hover:-translate-y-1">
      <Link to={`/product/${id}`} className="block">
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#F1E8D6]">
          <img
            src={image && image[0]}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-[#221A10]/85 text-[#E3B95C] eyebrow text-[9px] px-2.5 py-1.5">
              Save {discount}%
            </span>
          )}
          {/* gold reveal line */}
          <span className="absolute bottom-0 left-0 h-[2px] bg-[#C2913B] w-0 group-hover:w-full transition-all duration-500" />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5">
        <Link to={`/product/${id}`}>
          <h3 className="teko text-xl sm:text-[22px] leading-snug text-[#221A10] capitalize line-clamp-1 group-hover:text-[#8a6526] transition-colors">
            {name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1 min-h-[18px]">
          {reviews.length > 0 ? (
            <>
              {[1, 2, 3, 4, 5].map((r) => (
                <span key={r} className={`text-[13px] ${avgRating >= r ? "text-[#C2913B]" : "text-[#221A10]/15"}`}>★</span>
              ))}
              <span className="text-[11px] text-[#221A10]/50 ml-1">{avgRating.toFixed(1)}</span>
            </>
          ) : (
            <span className="eyebrow text-[9px] text-[#221A10]/40">New journey</span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-[#221A10]/10 flex items-baseline flex-wrap gap-x-2">
          <span className="teko text-xl sm:text-2xl text-[#221A10]">
            {currency}{fmt(price)}
          </span>
          {originalPrice > 0 && originalPrice > price && (
            <span className="text-xs text-[#221A10]/40 line-through">
              {currency}{fmt(originalPrice)}
            </span>
          )}
          <span className="eyebrow text-[8px] text-[#221A10]/45 w-full mt-0.5">per person</span>
        </div>

        <button
          onClick={bookOnWhatsApp}
          className="mt-5 w-full eyebrow text-[11px] py-3 bg-transparent text-[#221A10] border border-[#221A10]/30
                     hover:bg-[#221A10] hover:text-[#E3B95C] hover:border-[#221A10] transition-colors duration-300"
        >
          Book now
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
