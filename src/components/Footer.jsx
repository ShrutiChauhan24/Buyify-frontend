import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-20 py-16">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND / ABOUT */}
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              <span className="text-pink-600">BUY</span>IFY
            </h3>
            <p className="text-sm text-gray-400 mt-4 leading-relaxed">
              BUYIFY is a modern clothing brand focused on comfort,
              quality, and everyday style. Designed for people who
              value confidence and simplicity.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQs</Link></li>
            </ul>
          </div>

          {/* POLICIES */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/return-policy" className="hover:text-white">Return & Refund</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-pink-600" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pink-600" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pink-600" />
                <span>support@buyify.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-10" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* COPYRIGHT */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} BUYIFY. All rights reserved.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
