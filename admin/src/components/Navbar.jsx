import PropTypes from 'prop-types';

import { assets } from "../assets/admin_assets/assets.js"

const Navbar = ({ setToken }) => {
  return (
    <header className='sticky top-0 z-40 bg-[#FBF7EE]/95 backdrop-blur border-b border-[#221A10]/10'>
      <div className='flex items-center justify-between px-5 sm:px-8 h-[66px]'>
        <div className='flex items-center gap-3'>
          <img src={assets.logo} alt="Musafir Tribe" className='h-10 w-auto object-contain' />
          <span className='hidden sm:inline eyebrow text-[10px] text-[#C2913B] border-l border-[#221A10]/15 pl-3'>
            Admin Console
          </span>
        </div>
        <div className='flex items-center gap-3'>
        <a href={import.meta.env.VITE_STOREFRONT_URL || 'http://localhost:5173'} target='_blank' rel='noopener noreferrer'
          className='eyebrow text-[10px] px-5 py-2.5 text-[#221A10]/60 hover:text-[#C2913B] transition-colors'>
          View website ↗
        </a>
        <button
          onClick={() => setToken("")}
          className='eyebrow text-[10px] px-5 py-2.5 border border-[#221A10]/25 text-[#221A10]/70 rounded-sm
                     hover:bg-[#221A10] hover:text-[#E3B95C] hover:border-[#221A10] transition-colors duration-300'
        >
          Logout
        </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

Navbar.propTypes = {setToken: PropTypes.func.isRequired};
