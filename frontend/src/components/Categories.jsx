import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import mountain from '../assets/travel/himalayas.jpg';
import desert from '../assets/travel/desert.jpg';
import coast from '../assets/travel/coast.jpg';

const categories = [
  { title: 'Into the mountains', category: 'Mountains', caption: 'Fresh air. A different perspective.', image: mountain, alt: 'Snow-covered Himalayan peaks and pine forests' },
  { title: 'Chasing the coastline', category: 'Beach', caption: 'Salt in the air. Time on your side.', image: coast, alt: 'Clear blue water along a palm-lined coastline' },
  { title: 'Beyond the ordinary', category: 'Deserts', caption: 'Golden dunes. Wide-open horizons.', image: desert, alt: 'Golden desert dunes beneath a blue sky' },
];
export default function Categories() {
  return <section className="home-section" id="explore" aria-labelledby="categories-heading">
    <div className="home-section-heading">
      <div><p className="home-eyebrow">Follow your kind of adventure</p><h2 id="categories-heading">A change of scenery.<br /><em>A whole new feeling.</em></h2></div>
      <p>Some days call for the mountains.<br />Others, for absolutely no plans by the sea.<br />Find the escape that feels like you.</p>
    </div>
    <div className="escape-grid">{categories.map((item, index) => <Link to={`/collection?category=${item.category}`} className="escape-card" key={item.category}>
      <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
      <span className="escape-number">0{index + 1} / EXPLORE</span>
      <div className="escape-copy"><div><p>{item.caption}</p><h3>{item.title}</h3></div><span className="round-arrow"><FiArrowUpRight /></span></div>
    </Link>)}</div>
  </section>;
}
