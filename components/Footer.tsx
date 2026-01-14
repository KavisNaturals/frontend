'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#9EE94C' }} className="text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left: Company info */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Kavi's Naturals</h4>
            <p className="text-sm mt-2">
              Sri Mahaliammam Agro Products
              <br />S.F.No: 123/6A, Kummakkalipalayam,
              <br />Perundurai-638052 Erode,
              <br />Tamilnadu, India
            </p>
            <p className="text-sm mt-3">Gmail: kavisnaturals@gmail.com</p>
            <p className="text-sm">Phone: +91 98422 22355, 98429 22355</p>
          </div>

          {/* Middle: Useful Links & Help */}
          <div className="flex justify-center items-start">
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-semibold">Useful Links</h3>
                <ul className="space-y-3 mt-2">
                  <li><Link href="/" className="text-gray-900 text-sm hover:text-black">Home</Link></li>
                  <li><Link href="/shop" className="text-gray-900 text-sm hover:text-black">Shop</Link></li>
                  <li><Link href="/cart" className="text-gray-900 text-sm hover:text-black">Cart</Link></li>
                  <li><Link href="/track-order" className="text-gray-900 text-sm hover:text-black">Track Order</Link></li>
                </ul>
              </div>

              <div className="space-y-4 text-left">
                <h3 className="text-xl font-semibold">Help</h3>
                <ul className="space-y-3 mt-2">
                  <li><Link href="/privacy-policy" className="text-gray-900 text-sm hover:text-black">Privacy Policy</Link></li>
                  <li><Link href="/terms-conditions" className="text-gray-900 text-sm hover:text-black">Terms & Conditions</Link></li>
                  <li><Link href="/shipping-policy" className="text-gray-900 text-sm hover:text-black">Shipping Policy</Link></li>
                  <li><Link href="/return" className="text-gray-900 text-sm hover:text-black">Cancellations & Returns</Link></li>
                  <li><Link href="/my-account" className="text-gray-900 text-sm hover:text-black">Refund & Returns Policy</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Newsletter & small payment icons */}
          <div className="space-y-4 flex flex-col items-start">
            <h3 className="text-lg font-semibold">Join our Community</h3>
            <p className="text-sm">
              Stay informed about our latest offers, bulk order discounts, and exclusive deals. Sign up now to receive updates directly in your inbox.
            </p>

            <div className="mt-4 w-full">
              <div className="flex items-center border-2 border-black/10 bg-white rounded-full overflow-hidden w-full max-w-md">
                <input type="email" placeholder="Enter Your E-mail Address" className="flex-1 px-6 py-3 bg-transparent outline-none text-sm" />
                <button className="px-6 py-3 font-semibold">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social row */}
      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex items-start md:items-center justify-start">
          <div>
            <h5 className="text-xl font-semibold mb-4">Follow us on</h5>
            <div className="flex items-center space-x-3">
              <a href="#" className="w-10 h-10 border border-black/20 rounded flex items-center justify-center text-black">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-black/20 rounded flex items-center justify-center text-black">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-black/20 rounded flex items-center justify-center text-black">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-10 h-10 border border-black/20 rounded flex items-center justify-center text-black">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: copyright + payments */}
      <div className="mt-6">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-900 text-sm">© 2025 Kavi's Naturals All Rights Reserved</p>

            <div className="flex flex-col items-center ">
              <div className="flex flex-row items-center mr-8 px-6 py-6">
              <span className="text-gray-900 text-xs mr-4">100% SECURE PAYMENTS POWERED BY</span>
              <div className="mr-6">
                <Image src="/images/razorpay.png" alt="Razorpay" width={110} height={28} />
              </div>
            </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded overflow-hidden">
                  <Image src="/images/upi.png" alt="UPI" width={32} height={32} />
                </div>
                <div className="w-px h-6 bg-black/10 mx-3" />
                <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
                  <Image src="/images/phonepay.png" alt="PhonePe" width={32} height={32} />
                </div>
                <div className="w-px h-6 bg-black/10 mx-3" />
                <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
                  <Image src="/images/paypal.png" alt="PayPal" width={32} height={32} />
                </div>
                <div className="w-px h-6 bg-black/10 mx-3" />
                <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
                  <Image src="/images/gpay.png" alt="GPay" width={32} height={32} />
                </div>
                <div className="w-px h-6 bg-black/10 mx-3" />
                <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
                  <Image src="/images/paytm.png" alt="Paytm" width={32} height={32} />
                </div>
                <div className="w-px h-6 bg-black/10 mx-3" />
                <div className="flex items-center justify-center w-10 h-10  rounded overflow-hidden">
                  <Image src="/images/world.png" alt="Card" width={32} height={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer