import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (

      {/* Company Links */}
      <div>
        <p className="text-xl font-medium mb-5">YOKAI</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
      </div>
        {/* Support Links */}
        <div>
        <p className="text-xl font-medium mb-5">SUPPORT</p>
        <ul className="flex flex-col gap-1 text-gray-600">
          <li>FAQs</li>
          <li>Contact us</li>
          <li>Help center</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>

    </div>
  )
}

export default Footer
