import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextValue';
import CatalogueState from '../components/CatalogueState';

export default function Cart() {
  const { products, cartItems, updateQuantity, currency, productsLoading, productsError } = useContext(ShopContext);
  const saved = Object.keys(cartItems).filter(id => cartItems[id] > 0);
  return <section className="py-12 sm:py-16 min-h-[60vh]">
    <p className="eyebrow text-xs text-[#8a6526] mb-3">Keep the possibilities close</p>
    <h1 className="teko-head text-4xl sm:text-5xl mb-8">Your wishlist</h1>
    <CatalogueState />
    {!productsLoading && !productsError && (saved.length ? <div className="space-y-4">{saved.map(id => {
      const trip = products.find(p => p._id === id);
      return <article key={id} className="flex items-center gap-4 sm:gap-6 border border-[#221A10]/15 bg-[#FFFDF8] p-4 rounded-lg">
        {trip && <Link to={`/product/${id}`}><img className="w-20 h-24 sm:w-32 rounded object-cover" src={trip.image?.[0]} alt={trip.name} /></Link>}
        <div className="flex-1 min-w-0"><h2 className="teko text-xl sm:text-2xl">{trip?.name || 'Journey no longer available'}</h2>{trip && <><p className="text-sm my-2">{currency}{trip.price.toLocaleString('en-IN')} / person</p><Link className="text-sm underline underline-offset-4" to={`/product/${id}`}>View journey & enquire →</Link></>}</div>
        <button onClick={() => updateQuantity(id, 0)} aria-label={`Remove ${trip?.name || 'journey'}`} className="p-2 text-sm hover:text-red-700">Remove</button>
      </article>;
    })}</div> : <div className="py-16 px-5 bg-[#F1E8D6] text-center rounded-xl"><h2 className="teko text-3xl">Where will you go next?</h2><p className="mt-4 mb-7 text-sm">Save journeys as you explore. Your favourites will be waiting here.</p><Link to="/collection" className="inline-block bg-[#221A10] text-white px-7 py-3 rounded">Explore journeys</Link></div>)}
  </section>;
}
