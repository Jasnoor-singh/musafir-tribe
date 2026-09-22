
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';


const About = () => {
  return (
    <div>
      {/* FOUNDER'S NOTE */}
      <div className='text-2xl pt-8 border-t'>
        <Title text1={"FOUNDER'S"} text2={"NOTE"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row items-center gap-12'>
        {/* Founder Image */}
        <img
          src={assets.about_img}
          alt="founder-image"
          className='w-full md:max-w-[350px] rounded-md shadow-lg'
        />

        {/* Founder Message */}
        <div className='flex flex-col justify-center gap-4 md:w-3/5 text-gray-700'>
          <p className='text-md  sm:text-md lg:text-lg leading-relaxed'>
          At Musafir Tribe, we believe travel is the best teacher. What began as a small group of friends chasing sunrises across the Himalayas has grown into a community that plans unforgettable journeys for travellers from all over. We take care of the details — stays, routes, permits, and trusted local guides — so you can focus on the experience. Every package we offer is one we would happily pack our own bags for.
          </p>
          <p className='text-md  sm:text-md lg:text-lg leading-relaxed'>
            Feel free to shoot me an email at <a href="mailto:singhjasnoor618@gmail.com" className='text-orange-500 font-semibold hover:underline'>
              singhjasnoor618@gmail.com
            </a> if you need help planning your trip!
          </p>
          <div className='mt-4'>
            <b className='text-gray-800 text-2xl sm:text-2xl lg:text-3xl teko tracking-wider'>Jasnoor Singh</b>
            <p className='text-sm text-gray-600'>Founder</p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-md mb-20'>
        {/* Feature 1 */}
        <div className='border px-8 md:px-16 py-8 sm:py-16 flex flex-col gap-5
            transition-all duration-300 ease-in-out hover:bg-orange-600 hover:text-white'>
          <b className='text-2xl sm:text-2xl lg:text-3xl teko tracking-wider'>Quality Assurance:</b>
          <p>
            Browse journey details and compare destinations before deciding where to go.
          </p>
        </div>
        {/* Feature 2 */}
        <div className='border px-8 md:px-16 py-8 sm:py-16 flex flex-col gap-5
            transition-all duration-300 ease-in-out hover:bg-orange-600 hover:text-white'>
          <b className='text-2xl sm:text-2xl lg:text-3xl teko tracking-wider'>Convenience:</b>
          <p>
            Save your favourite trips in one place and send an enquiry when you are ready.
          </p>
        </div>
        {/* Feature 3 */}
        <div className='border px-8 md:px-16 py-8 sm:py-16 flex flex-col gap-5
            transition-all duration-300 ease-in-out hover:bg-orange-600 hover:text-white'>
          <b className='text-2xl sm:text-2xl lg:text-3xl teko tracking-wider'>Exceptional Customer Service:</b>
          <p>
            Our team is always ready to provide support and address your queries efficiently.
          </p>
        </div>
      </div>

      {/* Newsletter Section */}
      {/* <NewsLetterBox /> */}
    </div>
  );
};

export default About;
