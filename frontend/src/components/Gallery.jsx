import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import mountain from '../assets/travel/himalayas.jpg';
import desert from '../assets/travel/desert.jpg';
import coast from '../assets/travel/coast.jpg';
import paris from '../assets/Eiffel.jpg';

export default function Gallery() {
  return <section className="home-section" aria-labelledby="gallery-heading">
    <div className="home-section-heading"><div><p className="home-eyebrow">A window to somewhere else</p><h2 id="gallery-heading">Less scrolling.<br /><em>More looking around.</em></h2></div><p>A little inspiration for your next escape.<br />There’s a whole world beyond your routine.</p></div>
    <div className="travel-mosaic">
      <Link to="/collection?category=Mountains" className="mosaic-mountains"><img src={mountain} alt="Himalayan peaks framed by a pine forest" loading="lazy" /><div><span>THE HIGHER PERSPECTIVE</span><h3>Stay a little closer<br />to the sky.</h3></div><FiArrowUpRight /></Link>
      <Link to="/collection?category=Beach" className="mosaic-coast"><img src={coast} alt="Palm-lined beach and turquoise water" loading="lazy" /><div><span>THE SLOWER DAYS</span><h3>Let the tide decide.</h3></div><FiArrowUpRight /></Link>
      <Link to="/collection?category=Deserts" className="mosaic-desert"><img src={desert} alt="Sunlit desert sand dunes" loading="lazy" /><div><span>THE OPEN ROAD</span><h3>Go a little further.</h3></div><FiArrowUpRight /></Link>
      <Link to="/contact" className="mosaic-city"><img src={paris} alt="Eiffel Tower in Paris" loading="lazy" /><div><span>THE NEXT CHAPTER</span><h3>Dream beyond.</h3></div><FiArrowUpRight /></Link>
    </div>
  </section>;
}
