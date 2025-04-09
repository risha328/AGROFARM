/**import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-slate-200'>
      <div className='container mx-auto p-4'>
       <p className='text-center font-bold' title="Youtube Channel">Dynamic Coding with Amit</p>
      </div>
    </footer>
  )
}

export default Footer**/


import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">AGROFARM</h2>
          <p>Your trusted partner in agricultural products and solutions.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
            <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Product Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Product Categories</h3>
          <ul className="space-y-2">
            <li>Fruits & Vegetables</li>
            <li>Seeds & Fertilizers</li>
            <li>Animal Husbandry</li>
            <li>Farming Equipment</li>
            <li>Growth Promoters</li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>

          <h3 className="text-lg font-semibold mt-4 mb-2">Contact Us</h3>
          <p>Email: support@agrofarm.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-white/20 mt-6 pt-4">
        &copy; {new Date().getFullYear()} AGROFARM. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;