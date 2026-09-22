export function priceOrder(items, products, fee = 10) {
  if (!Array.isArray(items) || !items.length || items.length > 50) throw new Error('Choose at least one journey.');
  const seen = new Set();
  const pricedItems = items.map(item => {
    if (!item || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99 || seen.has(item._id)) throw new Error('Invalid journey quantity.');
    seen.add(item._id);
    const product = products.find(p => String(p._id) === item._id);
    if (!product || !Number.isFinite(product.price) || product.price < 0) throw new Error('A selected journey is unavailable.');
    return { _id: String(product._id), name: product.name, price: product.price, image: product.image, quantity: item.quantity };
  });
  return { items: pricedItems, amount: Math.round((pricedItems.reduce((sum, p) => sum + p.price * p.quantity, 0) + fee) * 100) / 100 };
}
