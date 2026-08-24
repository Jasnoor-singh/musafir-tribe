import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { motion } from 'framer-motion';
import beach from "../assets/Beach.png";
import desert from "../assets/Desert.png";
import mountain from "../assets/Mountain.png";
import temple from "../assets/Temple.png";
import tower from "../assets/Tower.png";
import eiffel from "../assets/Eiffel.jpg";

const DESTINATIONS = ["Manali", "Jaisalmer", "Goa", "Amritsar", "Kedarkantha", "Paris"];

const Gallery = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="my-10 w-full px-4 max-w-[1320px] mx-auto">
        <div className="text-center pt-8">
          <div className="inline-flex flex-col items-center mb-4">
            <Title text1="From our" text2="journeys" />
          </div>
          <p className="w-full max-w-xl mx-auto text-sm md:text-base text-[#221A10]/55 font-light mb-8 -mt-2">
            A glimpse of the places our travellers have woken up to this year.
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {DESTINATIONS.map((city) => (
              <Link
                key={city}
                to="/collection"
                className="eyebrow text-[10px] px-4 py-2 border border-[#221A10]/20 text-[#221A10]/70
                           hover:border-[#C2913B] hover:text-[#C2913B] transition-colors duration-300"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Gallery grid — six distinct destinations, not one repeated image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-full sm:h-full lg:h-[70vh]">
          <div className="md:col-span-3 grid grid-rows-2 gap-3">
            <div className="overflow-hidden group"><img src={mountain} alt="Manali" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
            <div className="overflow-hidden group"><img src={desert} alt="Jaisalmer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
          </div>

          <div className="md:col-span-5 overflow-hidden group">
            <img src={eiffel} alt="Paris" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>

          <div className="md:col-span-4 grid grid-rows-2 gap-3">
            <div className="overflow-hidden group"><img src={beach} alt="Goa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden group"><img src={temple} alt="Amritsar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
              <div className="overflow-hidden group"><img src={tower} alt="Kedarkantha" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Gallery;
