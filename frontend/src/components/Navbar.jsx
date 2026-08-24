import React, { useContext, useState, useEffect } from 'react';
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { RiMenu5Fill, RiCloseLine } from "react-icons/ri";
import { IoCart } from "react-icons/io5";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    };

    const showSearchIcon = location.pathname === "/collection";

    const links = [
        { to: '/', label: 'Home' },
        { to: '/collection', label: 'Journeys' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-50 bg-[#FBF7EE]/95 backdrop-blur border-b transition-all duration-300 ${scrolled ? 'border-[#221A10]/15 shadow-[0_8px_30px_rgba(34,26,16,0.08)]' : 'border-[#221A10]/10'}`}>
                <nav className='max-w-[1320px] mx-auto flex items-center justify-between px-4 sm:px-8 h-[72px]'>
                    {/* Logo */}
                    <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="shrink-0">
                        <img src={assets.logo} alt="Musafir Tribe" className="h-11 w-auto object-contain" />
                    </Link>

                    {/* Desktop links */}
                    <ul className='hidden sm:flex items-center gap-9'>
                        {links.map(({ to, label }) => (
                            <NavLink key={to} to={to} className='group flex flex-col items-center'>
                                {({ isActive }) => (
                                    <>
                                        <span className={`eyebrow text-[12px] transition-colors duration-300 ${isActive ? 'text-[#221A10]' : 'text-[#221A10]/55 group-hover:text-[#221A10]'}`}>{label}</span>
                                        <span className={`mt-1.5 h-px bg-[#C2913B] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </ul>

                    {/* Right actions */}
                    <div className='flex items-center gap-5 text-[#221A10]'>
                        {showSearchIcon && (
                            <FiSearch
                                className="w-[18px] h-[18px] cursor-pointer text-[#221A10]/70 hover:text-[#C2913B] transition-colors"
                                onClick={() => setShowSearch(!showSearch)}
                            />
                        )}

                        <div className='group relative flex items-center'>
                            <FaUser
                                className='w-[17px] h-[17px] cursor-pointer text-[#221A10]/70 hover:text-[#C2913B] transition-colors'
                                onClick={() => (token ? null : navigate("/login"))}
                            />
                            {token && (
                                <div className='group-hover:block hidden absolute right-0 top-full pt-4 z-10'>
                                    <div className='flex flex-col w-40 py-2 bg-[#FBF7EE] border border-[#221A10]/10 shadow-[0_18px_40px_rgba(34,26,16,0.15)] text-sm'>
                                        <Link to="/orders" className='px-4 py-2.5 text-[#221A10]/75 hover:bg-[#F1E8D6] hover:text-[#221A10]'>My Orders</Link>
                                        <button onClick={logout} className='px-4 py-2.5 text-left text-[#221A10]/75 hover:bg-[#F1E8D6] hover:text-[#221A10]'>Logout</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to='/cart' className='relative flex items-center'>
                            <IoCart className='w-[21px] h-[21px] cursor-pointer text-[#221A10]/70 hover:text-[#C2913B] transition-colors' />
                            {getCartCount() > 0 && (
                                <span className='absolute -right-2 -top-1.5 min-w-[15px] h-[15px] px-0.5 grid place-items-center bg-[#C2913B] text-[#221A10] rounded-full text-[9px] font-bold'>
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>

                        <RiMenu5Fill onClick={() => setVisible(true)} className='w-6 h-6 cursor-pointer sm:hidden' />
                    </div>
                </nav>
            </header>

            <div className="h-[72px]" />

            {/* Mobile drawer — espresso panel */}
            <div className={`fixed inset-0 z-[60] sm:hidden transition-opacity duration-300 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className='absolute inset-0 bg-[#221A10]/60' onClick={() => setVisible(false)} />
                <aside className={`absolute top-0 right-0 h-full w-3/4 max-w-[300px] bg-[#221A10] shadow-2xl transition-transform duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className='flex items-center justify-between px-5 h-[72px] border-b border-[#C2913B]/25'>
                        <span className='teko text-2xl text-[#E3B95C]'>Musafir Tribe</span>
                        <RiCloseLine className='w-7 h-7 cursor-pointer text-[#FBF7EE]/80' onClick={() => setVisible(false)} />
                    </div>
                    <div className='flex flex-col p-4 gap-1'>
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                onClick={() => setVisible(false)}
                                className={({ isActive }) => `px-4 py-3.5 eyebrow text-[12px] border-b border-[#FBF7EE]/10 ${isActive ? 'text-[#E3B95C]' : 'text-[#FBF7EE]/70 hover:text-[#E3B95C]'}`}
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </aside>
            </div>
        </>
    );
};

export default Navbar;
