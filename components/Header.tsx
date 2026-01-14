'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, User, Heart, ShoppingCart, Menu, ChevronDown, X } from 'lucide-react'
import AuthModal from './AuthModal'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const userDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const categories = [
    'Personal Care',
    'Health Care', 
    'Home Care',
    'Hair Care',
    'Skin Care',
    'Wellness Products'
  ]

  return (
    <header className="w-full">
      {/* Top Green Strip - Marquee */}
      <div className="bg-primary text-black text-base py-4 overflow-hidden font-roboto font-medium leading-none tracking-normal">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-8">★ Free Shipping above Rs. 600 Order ★</span>
          <span className="mx-8">★ We Deliver across all Over India ★</span>
          <span className="mx-8">★ Free Shipping above Rs. 600 Order ★</span>
          <span className="mx-8">★ We Deliver across all Over India ★</span>
          <span className="mx-8">★ Free Shipping above Rs. 600 Order ★</span>
          <span className="mx-8">★ We Deliver across all Over India ★</span>
          <span className="mx-8">★ Free Shipping above Rs. 600 Order ★</span>
          <span className="mx-8">★ We Deliver across all Over India ★</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-black hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={28} strokeWidth={2} />
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="Kavi's Naturals Logo" 
                className="h-10 md:h-14 w-auto"
                onError={(e) => {
                  // Fallback logo if image fails to load
                  e.currentTarget.style.display = 'none'
                  if (e.currentTarget.parentElement) {
                    e.currentTarget.parentElement.innerHTML = `
                      <div class="bg-primary text-white px-3 py-2 md:px-4 md:py-3 rounded-lg font-bold text-lg md:text-xl flex items-center">
                        <span class="text-white mr-1">🌿</span>
                        KaVi's
                        <span class="text-xs ml-1 bg-white text-primary px-1 rounded">NATURALS</span>
                      </div>
                    `
                  }
                }}
              />
            </div>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-4 lg:px-6 py-2 lg:py-3 border-2 border-gray-300 border-r-0 rounded-l-lg text-sm lg:text-base font-roboto focus:outline-none focus:border-primary bg-white"
                />
                <button className="bg-primary text-white px-4 lg:px-5 py-2 lg:py-3 rounded-r-lg hover:bg-primary-dark transition-colors flex items-center justify-center">
                  <Search size={20} className="lg:w-6 lg:h-6" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
              {/* Search icon for mobile only */}
              <button className="md:hidden flex flex-col items-center text-black hover:text-primary transition-colors">
                <Search size={24} strokeWidth={1.5} />
              </button>
              
              {/* User icon - dropdown menu */}
              <div className="relative hidden sm:block" ref={userDropdownRef}>
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex flex-col items-center text-black hover:text-primary transition-colors"
                >
                  <User size={24} className="lg:w-7 lg:h-7" strokeWidth={1.5} />
                </button>
                
                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px]">
                    {isLoggedIn ? (
                      <>
                        <a
                          href="/my-account"
                          className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors border-b border-gray-100 font-roboto font-medium text-base"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          My Account
                        </a>
                        <a
                          href="/my-orders"
                          className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors border-b border-gray-100 font-roboto font-medium text-base"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          My Orders
                        </a>
                        <button
                          onClick={() => {
                            setIsLoggedIn(false)
                            setIsUserDropdownOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors font-roboto font-medium text-base"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setIsAuthModalOpen(true)
                            setIsUserDropdownOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors border-b border-gray-100 font-roboto font-medium text-base"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            setIsAuthModalOpen(true)
                            setIsUserDropdownOpen(false)
                          }}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors font-roboto font-medium text-base"
                        >
                          Sign Up
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Heart icon - navigate to wishlist */}
              <a href="/wishlist" className="flex flex-col items-center text-black hover:text-primary transition-colors relative">
                <Heart size={24} className="lg:w-7 lg:h-7" strokeWidth={1.5} />
              </a>
              
              {/* Cart icon - navigate to shop */}
              <a href="/shop" className="flex flex-col items-center text-black hover:text-primary transition-colors relative">
                <ShoppingCart size={24} className="lg:w-7 lg:h-7" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <div className="hidden lg:block bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-12 py-3">
            {/* Browse All Category Button with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-primary text-black px-8 py-3 rounded-lg flex items-center space-x-3 hover:bg-primary-dark transition-colors font-roboto font-semibold text-2xl leading-none tracking-normal"
              >
                <Menu size={20} />
                <span>Browse All Category</span>
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[200px]">
                  {categories.map((category, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors border-b border-gray-100 last:border-b-0 font-roboto font-medium text-lg leading-none tracking-normal"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex space-x-12">
              <a href="/" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                Home
              </a>
              <a href="/shop" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                Shop
              </a>
              <a href="/track-order" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                Track Order
              </a>
              <a href="/return" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                Return
              </a>
              {/* <a href="/wishlist" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                Wishlist
              </a>
              <a href="/my-orders" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                My Orders
              </a> */}
              <a href="/contact" className="text-black hover:text-primary font-roboto font-semibold text-2xl leading-none tracking-normal transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-roboto font-bold text-xl">Menu</h2>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={2} />
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 border-r-0 rounded-l-lg text-sm font-roboto focus:outline-none focus:border-primary bg-white"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark transition-colors flex items-center justify-center">
                <Search size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex-1 overflow-y-auto">
            {/* Categories Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-roboto font-semibold text-lg mb-3 text-gray-700">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-3 text-gray-700 hover:bg-primary hover:text-black transition-colors rounded-lg font-roboto font-medium text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            {/* Main Navigation Links */}
            <nav className="p-4 space-y-2">
              <h3 className="font-roboto font-semibold text-lg mb-3 text-gray-700">Navigation</h3>
              <a 
                href="/" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/shop" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </a>
              <a 
                href="/track-order" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Order
              </a>
              <a 
                href="/return" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Return
              </a>
              <a 
                href="/wishlist" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Wishlist
              </a>
              <a 
                href="/my-orders" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Orders
              </a>
              <a 
                href="/my-account" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Account
              </a>
              <a 
                href="/contact" 
                className="block px-4 py-3 text-black hover:bg-gray-100 rounded-lg font-roboto font-medium text-base transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200">
            <a 
              href="#" 
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-roboto font-medium text-base transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={20} />
              <span>My Account</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  )
}

export default Header