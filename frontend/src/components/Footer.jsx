import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-24 bg-[#221A10] text-[#FBF7EE]'>
      {/* top hairline */}
      <div className='h-[3px] bg-gradient-to-r from-transparent via-[#C2913B] to-transparent' />

      <div className='max-w-[1320px] mx-auto px-6 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12'>
        {/* Brand */}
        <div>
          <div className='bg-[#FBF7EE] inline-block rounded-sm p-2 mb-5'>
            <img src={assets.logo} alt="Musafir Tribe" className='h-10 w-auto object-contain' />
          </div>
          <p className='text-sm leading-relaxed text-[#FBF7EE]/65 max-w-sm font-light'>
            Musafir Tribe curates handpicked travel experiences across India and
            beyond — from Himalayan treks to desert safaris and coastal escapes.
            Travel light, travel together, travel with the tribe.
          </p>
        </div>

        {/* Company */}
        <div>
          <p className='eyebrow text-[11px] text-[#E3B95C] mb-6'>Company</p>
          <ul className='flex flex-col gap-3.5 text-sm'>
            <NavLink to='/' className='text-[#FBF7EE]/65 hover:text-[#E3B95C] transition-colors w-fit'>Home</NavLink>
            <NavLink to='/collection' className='text-[#FBF7EE]/65 hover:text-[#E3B95C] transition-colors w-fit'>Journeys</NavLink>
            <NavLink to='/about' className='text-[#FBF7EE]/65 hover:text-[#E3B95C] transition-colors w-fit'>About</NavLink>
            <NavLink to='/contact' className='text-[#FBF7EE]/65 hover:text-[#E3B95C] transition-colors w-fit'>Contact</NavLink>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='eyebrow text-[11px] text-[#E3B95C] mb-6'>Get in touch</p>
          <ul className='flex flex-col gap-3.5 text-sm text-[#FBF7EE]/65'>
            <li><a href="tel:+918295699366" className='hover:text-[#E3B95C] transition-colors'>+91 8295699366</a></li>
            <li><a href="mailto:hello@musafirtribe.com" className='hover:text-[#E3B95C] transition-colors'>hello@musafirtribe.com</a></li>
            <li className='font-light'>Ludhiana, Punjab, India</li>
          </ul>
        </div>
      </div>

      <div className='border-t border-[#FBF7EE]/10'>
        <div className='max-w-[1320px] mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2'>
          <p className='eyebrow text-[9px] text-[#FBF7EE]/40'>© Musafir Tribe — All rights reserved</p>
          <p className='eyebrow text-[9px] text-[#FBF7EE]/40'>Crafted for the modern traveller</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
