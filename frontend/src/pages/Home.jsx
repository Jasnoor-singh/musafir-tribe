import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import WhatsAppChat from './Whatsapp'
import HomeFeedback from '../components/HomeFeedback'
import CategoriesSlider from '../components/Categories'
import Experience from '../components/Experience'
import Gallery from '../components/Gallery'
import ContactUs from '../components/ContactUs'
import PopupForm from '../components/Popupform'
// import Freeship from '../components/Freeship'


const Home = () => {
  return (
    <div>

      
        
       
        <PopupForm />
        <CategoriesSlider/>
        {/* <Experience/> */}
        <LatestCollection/>
        {/* <BestSeller/> */}
        
        {/* <OurPolicy/> */}
        <Gallery/>
        <HomeFeedback/>
        {/* <NewsLetterBox/> */}
        <ContactUs/>
        <WhatsAppChat />
    </div>
  )
}

export default Home