



import { FaExchangeAlt, FaRegCheckCircle, FaHeadset } from 'react-icons/fa'; // Importing icons
import Title from './Title';

const OurPolicy = () => {
  return (
    <div className="my-10">
      {/* Title Section */}
      <div className="text-center pt-8 text-3xl">
        <Title text1="WHY CHOOSE" text2="US" />
        <p className="w-3/4 m-auto text-sm sm:text-sm md:text-base text-gray-500 lg:text-md">
          My mission is to connect people with each other and with the world around them. 
        </p>
      </div>

      {/* Feature Section */}
        <div className="flex flex-col sm:flex-row justify-around lg:justify-between gap-4 lg:gap-2 text-center py-8  md:text-lg">
        {/* Feature 1 */}
        <div className="border shadow-md p-5 sm:p-5 lg:p-12 rounded-md transition-all duration-300 ease-in-out hover:bg-orange-600  w-full gap-2 flex flex-col items-center justify-center group">
          <FaExchangeAlt className="text-4xl  m-auto mb-4 text-orange-600 group-hover:text-white" /> {/* Icon */}
          <p className="font-semibold text-2xl sm:text-2xl lg:text-4xl teko tracking-wider group-hover:text-white">
            Easy Returns
          </p>
          <p className="text-gray-600 group-hover:text-gray-200 text-sm sm:text-base md:text-lg lg:text-sm">
            30 Days Return Policy
          </p>
        </div>

        {/* Feature 2 */}
        <div className="border shadow-md p-5 sm:p-5 lg:p-12 rounded-md transition-all duration-300 ease-in-out hover:bg-orange-600  w-full gap-2 flex flex-col items-center justify-center group">
          <FaRegCheckCircle className="text-4xl  m-auto mb-4 text-orange-600 group-hover:text-white" /> {/* Icon */}
          <p className="text-2xl sm:text-2xl lg:text-4xl teko tracking-wider group-hover:text-white">
            Quality Assured
          </p>
          <p className="text-gray-600 group-hover:text-gray-200 text-sm sm:text-base md:text-lg lg:text-sm">
            100% Genuine Trips
          </p>
        </div>

        {/* Feature 3 */}
        <div className="border shadow-md p-5 sm:p-5 lg:p-12 rounded-md transition-all duration-300 ease-in-out hover:bg-orange-600  w-full gap-2 flex flex-col items-center justify-center group">
          <FaHeadset className="text-4xl  m-auto mb-4 text-orange-600 group-hover:text-white" /> {/* Icon */}
          <p className="font-semibold text-2xl sm:text-2xl  lg:text-4xl teko tracking-wider group-hover:text-white">
            Best Customer Support
          </p>
          <p className="text-gray-600 group-hover:text-gray-200 text-sm sm:text-base md:text-lg lg:text-sm">
            Contact MusafirTribe: +91 8295699366
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
