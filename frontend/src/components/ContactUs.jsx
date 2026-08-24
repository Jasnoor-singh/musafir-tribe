import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const ContactUs = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >
            <div className="my-8 lg:mt-20 max-w-[1320px] mx-auto px-4">
                <div className="relative bg-[#221A10] overflow-hidden flex flex-col items-center justify-center text-center p-10 md:p-16">
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C2913B] to-transparent" />
                    <span className="eyebrow text-[10px] text-[#E3B95C] mb-4">Ready when you are</span>
                    <h2 className="teko-head text-3xl md:text-5xl lg:text-6xl text-[#FBF7EE] leading-tight max-w-2xl">
                        Let's plan your next journey.
                    </h2>
                    <p className="mt-4 text-[#FBF7EE]/60 font-light text-sm md:text-base max-w-lg">
                        Tell us where you'd like to go — our team replies within a day with an itinerary built around you.
                    </p>
                    <Link to="/contact" className="mt-8">
                        <div className="px-9 py-3.5 bg-[#C2913B] text-[#221A10] eyebrow text-xs border border-[#C2913B] hover:bg-transparent hover:text-[#E3B95C] transition-colors duration-300">
                            Contact us
                        </div>
                    </Link>
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#C2913B] to-transparent" />
                </div>
            </div>
        </motion.div>
    )
}

export default ContactUs
