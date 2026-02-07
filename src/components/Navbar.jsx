import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ShoppingBag, User, Package, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setUserLogout } from "../../redux/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const {isAuthenticated} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    const handleLogout = ()=>{
     dispatch(setUserLogout())
    }

  return (
    <nav className="bg-white border-b border-[#EDEDED] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#1A1A1A]">
              <span className="text-pink-600">BUY</span>IFY
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={"/"}
              className="text-[#1A1A1A] font-medium hover:text-[#FF0054] transition duration-300"
            >
              Home
            </Link>
            <Link
              to={"/shop/all-products"}
              className="text-[#1A1A1A] font-medium hover:text-[#FF0054] transition duration-300"
            >
              Shop
            </Link>
            <Link
              to={"/about"}
              className="text-[#1A1A1A] font-medium hover:text-[#FF0054] transition duration-300"
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className="text-[#1A1A1A] font-medium hover:text-[#FF0054] transition duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="text-[#1A1A1A] hover:text-[#FF0054] transition duration-300"
                >
                  <User size={24} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                    <button
                      onClick={() => {
                        navigate("/my-orders");
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full px-4 py-3 text-sm flex items-center gap-2 hover:bg-pink-50 transition"
                    >
                      <Package size={16} />
                      My Orders
                    </button>

                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout()
                      }}
                      className="w-full px-4 py-3 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-pink-600 text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition duration-300"
              >
                Login
              </button>
            )}

            <button className="bg-[linear-gradient(to_right,#FF0054,#FF3B7A)] text-white px-6 py-2 rounded-full font-bold hover:shadow-lg transition duration-300 flex items-center space-x-2"
              onClick={() => navigate("/cart-items")}
            >
              <ShoppingBag size={20} />
              <span>Cart</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#1A1A1A] hover:text-[#FF0054] transition duration-300"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#EDEDED]">
          <div className="px-4 pt-4 pb-6 space-y-4">
            <Link
               to="/"
              className="block text-[#1A1A1A] font-medium py-2 hover:text-[#FF0054] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop/all-products"
              className="block text-[#1A1A1A] font-medium py-2 hover:text-[#FF0054] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block text-[#1A1A1A] font-medium py-2 hover:text-[#FF0054] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-[#1A1A1A] font-medium py-2 hover:text-[#FF0054] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

           {isAuthenticated ? (
             <>
            <Link
               to="/my-orders"
              className="block text-[#1A1A1A] font-medium py-2 hover:text-[#FF0054] transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              My Orders
            </Link> 
            <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout()
                      }}
                      className="w-full px-4 py-3 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                    </>
                    ) : (
                      <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/login')
                      }}
                      className="w-full px-4 py-3 text-sm flex items-center gap-2 text-red-600 hover:bg-red-50 transition"
                    >
                      Login
                    </button>
                    )
                  } 
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
