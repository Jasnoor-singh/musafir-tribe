import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios, { backendUrl } from '../lib/api';

import { ShopContext } from './ShopContextValue';
const readGuestCart = () => {
  try { return JSON.parse(localStorage.getItem('musafir-wishlist') || '{}'); }
  catch { return {}; }
};

const ShopContextProvider = ({ children }) => {
  const currency = '₹ ';
  const delivery_fee = 10;
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(readGuestCart);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  const getProductsData = useCallback(async () => {
    setProductsLoading(true);
    setProductsError('');
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      if (!data.success || !Array.isArray(data.products)) throw new Error(data.message || 'Could not load journeys.');
      setProducts(data.products);
    } catch (error) { setProductsError(error.message); }
    finally { setProductsLoading(false); }
  }, []);

  useEffect(() => { getProductsData(); }, [getProductsData]);
  useEffect(() => {
    if (!token) return;
    let active = true;
    axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } })
      .then(({ data }) => {
        if (!active) return;
        if (data.success) setCartItems(data.cartData || {});
        else { localStorage.removeItem('token'); setToken(''); toast.error(data.message); }
      })
      .catch(error => { if (active) toast.error(error.message); });
    return () => { active = false; };
  }, [token]);
  useEffect(() => {
    if (!token) localStorage.setItem('musafir-wishlist', JSON.stringify(cartItems));
  }, [cartItems, token]);

  const updateQuantity = async (itemId, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 99) return false;
    try {
      if (token) {
        const { data } = await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, { headers: { token } });
        if (!data.success) throw new Error(data.message);
      }
      setCartItems(previous => {
        const next = { ...previous };
        if (quantity === 0) delete next[itemId]; else next[itemId] = quantity;
        return next;
      });
      return true;
    } catch (error) { toast.error(error.message); return false; }
  };
  const addToCart = async itemId => {
    if (cartItems[itemId]) { toast.info('This journey is already in your wishlist.'); return true; }
    const saved = await updateQuantity(itemId, 1);
    if (saved) toast.success('Journey saved to your wishlist');
    return saved;
  };
  const getCartCount = () => Object.values(cartItems).filter(quantity => quantity > 0).length;
  const getCartAmount = () => products.reduce((sum, product) => sum + product.price * (cartItems[product._id] || 0), 0);

  return <ShopContext.Provider value={{ products, productsLoading, productsError, retryProducts: getProductsData,
    currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart,
    getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken, setCartItems }}>
    {children}
  </ShopContext.Provider>;
};
export default ShopContextProvider;

ShopContextProvider.propTypes = {children: PropTypes.node};
