
import Button from './Button';
import { motion } from 'framer-motion';
import CountUp from 'react-countup'; // Import CountUp
import { useInView } from 'react-intersection-observer'; // Import useInView for scroll detection
import Experienceimg from "../assets/Experience.png"

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger animation only once when the section comes into view
    threshold: 0.3,    // Start the animation when 30% of the section is visible
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div
        ref={ref} // Attach the ref to the container
        className="bg-cream min-h-screen flex items-center py-8"
      >
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32">
          {/* Image Content */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div className="max-w-full lg:max-w-xl">
              <img
                src={Experienceimg}
                alt="Travel"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
            <p className="text-base sm:text-xl text-[#C2913B] mb-2 sm:mb-4 font-bold">
              Our Experience
            </p>
            <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold mb-4 teko">
              Our Stories Have Adventures
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              We are experienced in bringing adventures to stay their journey, with all outdoor destinations in the world as our specialties. Start your adventure now! Nature has already called you!
            </p>

            {/* Statistics Flex - Responsive Wrap */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-2 lg:gap-4 mb-6 sm:mb-8">
              {[
                { value: 12000, label: 'Trips Done' },
                { value: 500, label: 'Destinations' },
                { value: 10000, label: 'Customers' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white p-3 sm:p-4 rounded-lg items-center w-[30%] sm:w-[30%] lg:w-[30%]"
                >
                  {/* Use CountUp with conditional start */}
                  <h1 className="text-orange-950 text-xl sm:text-3xl font-bold">
                    {inView && ( // Start counting only when the section is in view
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                      />
                    )}
                  </h1>
                  <p className="text-xs sm:text-base text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button onClick={() => window.location.href = '/collection'}>Book Now </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
