import { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContextValue';
import ProductItem from '../components/ProductItem';
import CatalogueState from '../components/CatalogueState';

export default function Collection() {
  const { products, productsLoading, productsError } = useContext(ShopContext);
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('category') || '';
  const sort = params.get('sort') || 'relevant';
  const update = (key, value) => setParams(previous => {
    const next = new URLSearchParams(previous);
    if (value) next.set(key, value); else next.delete(key);
    return next;
  }, { replace: true });
  const categories = [...new Set(['Mountains', 'Deserts', 'Beach', ...products.map(p => p.category).filter(Boolean)])];
  const filtered = useMemo(() => {
    const result = products.filter(p => (!category || p.category === category) &&
      `${p.name} ${p.description}`.toLowerCase().includes(search.trim().toLowerCase()));
    if (sort === 'low-high') result.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, search, sort]);

  return <section className="py-12 sm:py-16 min-h-[65vh]">
    <p className="eyebrow text-xs text-[#8a6526] mb-4">Find your next escape</p>
    <h1 className="teko-head text-4xl sm:text-6xl">A journey for every kind of you.</h1>
    <p className="text-[#4A3B28] mt-5 max-w-xl leading-relaxed">Slow mornings, mountain trails or a change of scenery. Explore the collection and make room for something new.</p>
    <div className="my-8 flex flex-col sm:flex-row gap-3">
      <input aria-label="Search journeys" type="search" placeholder="Search a destination or journey…" value={search} onChange={e => update('q', e.target.value)} className="flex-1 min-w-0 bg-white border border-[#221A10]/20 rounded-lg p-4" />
      <select aria-label="Sort journeys" value={sort} onChange={e => update('sort', e.target.value)} className="bg-white border border-[#221A10]/20 rounded-lg p-4">
        <option value="relevant">Recommended</option><option value="low-high">Price: low to high</option><option value="high-low">Price: high to low</option>
      </select>
    </div>
    <div className="flex flex-wrap gap-2 mb-8" aria-label="Journey categories">
      {['', ...categories].map(value => <button key={value} aria-pressed={category === value} onClick={() => update('category', value)} className={`px-5 py-2.5 rounded-full text-sm border transition-colors ${category === value ? 'bg-[#221A10] text-[#FBF7EE] border-[#221A10]' : 'border-[#221A10]/20 hover:border-[#C2913B]'}`}>{value || 'All journeys'}</button>)}
    </div>
    <CatalogueState />
    {!productsLoading && !productsError && <>
      <p className="text-sm text-[#4A3B28] mb-5" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'journey' : 'journeys'} to explore</p>
      {filtered.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(p => <ProductItem key={p._id} {...p} id={p._id} />)}</div> :
        <div className="text-center py-16 bg-[#F1E8D6] rounded-xl"><h2 className="teko text-3xl">No journeys found</h2><p className="mt-3 mb-6">Try another destination or clear your filters.</p><button className="underline underline-offset-4" onClick={() => setParams({})}>Clear filters</button></div>}
    </>}
  </section>;
}
