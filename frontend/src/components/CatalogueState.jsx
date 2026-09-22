import { useContext } from 'react';
import { ShopContext } from '../context/ShopContextValue';

export default function CatalogueState() {
  const { productsLoading, productsError, retryProducts } = useContext(ShopContext);
  if (productsLoading) return <div role="status" className="py-16 text-center text-[#4A3B28]">Loading your next adventure…</div>;
  if (productsError) return <div role="alert" className="my-8 border border-[#C2913B]/40 bg-[#F1E8D6] p-8 text-center rounded-lg">
    <h2 className="teko text-2xl">Journeys are temporarily unavailable</h2>
    <p className="my-3 text-sm">{productsError}</p>
    <button onClick={retryProducts} className="px-6 py-3 bg-[#221A10] text-white rounded">Try again</button>
  </div>;
  return null;
}
