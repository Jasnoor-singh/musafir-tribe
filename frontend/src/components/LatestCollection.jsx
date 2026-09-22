import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContextValue';
import CatalogueState from './CatalogueState';
import ProductItem from './ProductItem';

export default function LatestCollection() {
  const { products, productsLoading, productsError, currency } = useContext(ShopContext);
  const featured = products[0];
  return <section className="home-section featured-section" aria-labelledby="featured-heading">
    <div className="home-section-heading"><div><p className="home-eyebrow">Make room for a little adventure</p><h2 id="featured-heading">Your next <em>great story.</em></h2></div><Link className="home-text-link" to="/collection">View all journeys <FiArrowUpRight /></Link></div>
    <CatalogueState />
    {!productsLoading && !productsError && featured && <article className="featured-journey">
      <Link to={`/product/${featured._id}`} className="featured-photo"><img src={featured.image?.[0]} alt={featured.name} loading="lazy" decoding="async" /><span className="photo-tag"><FiMapPin /> {featured.category}</span></Link>
      <div className="featured-story"><p className="home-eyebrow">In the spotlight</p><h3>{featured.name}</h3><p className="featured-description">{featured.description}</p><div className="featured-details"><span>Make it your journey</span><p>Choose your dates. Bring your people.<br />We’ll help with the next step.</p></div><div className="featured-booking"><p><span>Starting from</span><strong>{currency}{Number(featured.price).toLocaleString('en-IN')}</strong><small>per person</small></p><Link className="home-button dark" to={`/product/${featured._id}`}>Discover the trip <FiArrowUpRight /></Link></div></div>
    </article>}
    {!productsLoading && !productsError && !featured && <div className="catalogue-empty"><h3>More journeys are on the way.</h3><Link className="home-text-link" to="/contact">Plan a trip with us <FiArrowUpRight /></Link></div>}
    {products.length > 1 && <div className="more-journeys">{products.slice(1, 4).map(p => <ProductItem key={p._id} {...p} id={p._id} />)}</div>}
  </section>;
}
