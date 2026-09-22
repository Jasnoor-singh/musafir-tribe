import LatestCollection from '../components/LatestCollection';
import WhatsAppChat from './Whatsapp';
import HomeFeedback from '../components/HomeFeedback';
import CategoriesSlider from '../components/Categories';
import Gallery from '../components/Gallery';
import ContactUs from '../components/ContactUs';

export default function Home() {
  return <div className="homepage">
    <div className="home-manifesto"><span>Made for curious souls.</span><p>Find your place. Meet your people. <em>Travel with the tribe.</em></p><span>EST. IN ADVENTURE ↗</span></div>
    <CategoriesSlider />
    <LatestCollection />
    <Gallery />
    <HomeFeedback />
    <ContactUs />
    <WhatsAppChat />
  </div>;
}
