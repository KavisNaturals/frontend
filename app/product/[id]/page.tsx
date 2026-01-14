"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  ChevronDown,
  X,
} from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState("/images/shop-cart/img-1.png");
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    benefits: false,
    ingredients: false,
    direction: false,
  });
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    review: "",
    name: "",
    email: "",
    place: "",
  });

  const product = {
    id: 1,
    name: "Aloe vera Shampoo",
    size: "( 200 ml )",
    price: "₹164",
    originalPrice: "₹199",
    rating: 4.8,
    reviews: 2366,
    description: "Frizz-Free, Strong & Health Hair",
    mainImage: "/images/shop-cart/img-1.png",
    images: [
      "/images/shop-cart/img-4.png",
      "/images/shop-cart/img-5.png",
      "/images/shop-cart/img-6.png",
    ],
    options: [
      { name: "Aloe Vera Shampoo (150 ML)", price: "₹164", original: "₹199" },
      { name: "Aloe Vera Shampoo (200 ML)", price: "₹326", original: "₹399" },
    ],
    productDescription:
      "RICE UP AND SHINE! Give your hair a lift with our Rice Water Shampoo that brings the ancient beauty secret to your shower, nourishing and strengthening your hair from root to tip. Enriched with antioxidants and minerals, this shampoo helps promote healthy, shiny and strong hair because healthy hair is always in style!",
    benefits: [
      "Strengthens hair roots",
      "Reduces hair fall and breakage",
      "Promotes scalp health",
      "Adds shine and volume",
      "Natural ingredients without chemicals",
    ],
    ingredients: [
      "Aloe Vera Extract",
      "Rice Bran Extract",
      "Coconut Oil",
      "Vitamin E",
      "Natural Plant Proteins",
      "Herbal Extracts",
    ],
    direction:
      "Apply shampoo to wet hair and massage gently into the scalp. Leave for 2-3 minutes. Rinse thoroughly with water. Use 2-3 times a week for best results.",
    beforeAfterImage1: "/images/shop-cart/img-12.png",
  };

  const frequentlyBought = [
    {
      id: 1,
      name: "Onion Shampoo (200 ml)",
      price: "₹164",
      image :"/images/shop-cart/img-9.png",
    },
    {
      id: 2,
      name: "Milk Protein Shampoo (200 ml)",
      price: "₹215",
      image: "/images/shop-cart/img-10.png",
    },
    {
      id: 3,
      name: "Aloe vera Shampoo (200 ml)",
      price: "₹164",
        image: "/images/shop-cart/img-11.png",
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${
              star <= Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", { rating, ...reviewData });
    setShowReviewModal(false);
    setRating(0);
    setReviewData({ review: "", name: "", email: "", place: "" });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <p className="text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-primary">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">
              {product.name} {product.size}
            </span>
          </p>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image with Blue Border */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-6 aspect-square flex items-center justify-center overflow-hidden border-4 ">
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                <div
                  onClick={() => setMainImage(product.mainImage)}
                  className={`bg-gray-50 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${
                    mainImage === product.mainImage
                      ? "border-4 "
                      : "border-2 border-gray-200"
                  }`}
                >
                  <Image
                    src={product.mainImage}
                    alt="Product view main"
                    width={100}
                    height={100}
                    className="object-contain w-full h-full"
                  />
                </div>
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`bg-gray-50 rounded-lg p-3 cursor-pointer hover:shadow-md transition-all ${
                      mainImage === img
                        ? "border-4 border-blue-500"
                        : "border-2 border-gray-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      width={100}
                      height={100}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div>
              {/* Breadcrumb for mobile */}
              <p className="text-sm text-gray-600 mb-4 lg:hidden">
                Home / Product
              </p>

              {/* Product Name & Rating */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{product.size}</p>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-3xl font-bold text-gray-800">
                  {product.price}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              </div>

              {/* Select Options */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Select Options
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.options.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedOption(option.name)}
                      className={`p-3 rounded-2xl border-3 cursor-pointer transition-all flex flex-col items-center ${
                        selectedOption === option.name
                          ? "border-primary bg-primary bg-opacity-5"
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      {/* Product Image in Option */}
                      <div className="w-full aspect-square mb-3 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                        <Image
                          src={product.mainImage}
                          alt={option.name}
                          width={100}
                          height={100}
                          className="object-contain w-full h-full p-3"
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-800 text-center mb-2">
                        {option.name}
                      </p>
                      <div className="text-center">
                        <p className="text-base font-bold text-gray-800">
                          {option.price}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          {option.original}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 ">
                  <div className="flex items-center border-2 border-primary rounded-lg bg-primary bg-opacity-20">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-primary hover:text-primary-dark transition-colors font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-12 text-center border-l border-r border-primary focus:outline-none py-2 bg-primary bg-opacity-10"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3  py-2 text-primary hover:text-primary-dark transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="w-full mb-2 ms-2 bg-primary text-black font-bold py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg">
                  Add to Cart
                </button>
              </div>
              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-primary text-black font-bold py-4 rounded-lg hover:bg-primary-dark transition-colors text-lg">
                  Checkout Now
                </button>
              </div>

              {/* Share & Wishlist */}
              {/* <div className="flex items-center space-x-4 mt-6">
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors">
                  <Heart size={20} />
                  <span>Wishlist</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 py-3 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Bought Together */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-4 border-primary rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Frequently Bought Together
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-6">
              {frequentlyBought.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex-1 text-center">
                    <div className="bg-gray-50 rounded-xl p-4 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={180}
                        height={180}
                        className="object-contain"
                      />
                    </div>
                    <p className="font-medium text-gray-800 text-sm mb-1">
                      {item.name}
                    </p>
                    <p className="text-base font-bold text-gray-800">
                      {item.price}
                    </p>
                  </div>
                  {idx < frequentlyBought.length - 1 && (
                    <div className="text-4xl font-light text-gray-400">+</div>
                  )}
                </React.Fragment>
              ))}
              
              <div className="flex flex-col items-center gap-4 pl-6 border-l-2 border-gray-300">
                <div className="text-center">
                  <p className="text-gray-800 font-semibold mb-2">Total Price :</p>
                  <div>
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">{product.originalPrice}</span>
                  </div>
                </div>
                <button className="bg-primary text-black font-bold px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details - Non-Expandable Sections */}
      <section className="py-12" style={{ backgroundColor: 'rgba(233, 249, 217, 0.6)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Sections */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-primary">
                  <h3 className="text-2xl font-bold text-gray-800">Description</h3>
                  <button
                    onClick={() => toggleSection("description")}
                    className="text-2xl text-gray-400 font-light hover:text-gray-600"
                  >
                    {expandedSections.description ? '−' : '+'}
                  </button>
                </div>
                {expandedSections.description && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {product.productDescription}
                  </p>
                )}
              </div>

              {/* Benefits */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-primary">
                  <h3 className="text-2xl font-bold text-gray-800">Benefits</h3>
                  <button
                    onClick={() => toggleSection("benefits")}
                    className="text-2xl text-gray-400 font-light hover:text-gray-600"
                  >
                    {expandedSections.benefits ? '−' : '+'}
                  </button>
                </div>
                {expandedSections.benefits && (
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <span className="text-primary text-lg">✓</span>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-primary">
                  <h3 className="text-2xl font-bold text-gray-800">Ingredients</h3>
                  <button
                    onClick={() => toggleSection("ingredients")}
                    className="text-2xl text-gray-400 font-light hover:text-gray-600"
                  >
                    {expandedSections.ingredients ? '−' : '+'}
                  </button>
                </div>
                {expandedSections.ingredients && (
                  <ul className="grid grid-cols-2 gap-3">
                    {product.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        • {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Direction to Use */}
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-primary">
                  <h3 className="text-2xl font-bold text-gray-800">Direction To Use</h3>
                  <button
                    onClick={() => toggleSection("direction")}
                    className="text-2xl text-gray-400 font-light hover:text-gray-600"
                  >
                    {expandedSections.direction ? '−' : '+'}
                  </button>
                </div>
                {expandedSections.direction && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {product.direction}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side - Before & After Images */}
            <div>
              <div className="">
                <div className="text-center">
                    <Image
                      src={product.beforeAfterImage1}
                      alt="Before"
                      width={500}
                      height={150}
                      className="object-contain w-full h-full"
                    />
                 
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Listing */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-6 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/aloe-vera-shampoo.png"
                  alt="Aloe vera Shampoo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Aloe vera Shampoo ( 200 ml )</p>
              <p className="text-xs text-gray-600">Frizz-Free, Strong & Health Hair</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹164</p>
            </div>

            {/* Product 2 */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-6 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/milk-protein-shampoo.png"
                  alt="Milk Protein Shampoo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Milk Protein Shampoo ( 200 ml )</p>
              <p className="text-xs text-gray-600">Hair Cleanser & hair strong and shiny</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹215</p>
            </div>

            {/* Product 3 */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-6 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/onion-shampoo.png"
                  alt="Onion Shampoo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Onion Shampoo ( 200 ml )</p>
              <p className="text-xs text-gray-600">Reducing hair fall & breakage</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹195</p>
            </div>

            {/* Product 4 */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-6 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/shikakai-shampoo.png"
                  alt="Shikakai & Reetha Shampoo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Shikakai & Reetha Shampoo ( 200 ml )</p>
              <p className="text-xs text-gray-600">Natural hair strengthening formula</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹175</p>
            </div>

            {/* Product 5 */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-6 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/organic-detergent.png"
                  alt="Natural wash Organic Detergent"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Natural wash Organic Detergent Liquid ( 1000 ml )</p>
              <p className="text-xs text-gray-600">Gentle on clothes, tough on stains</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹245</p>
            </div>

            {/* Product 6 */}
            <div className="text-center">
              <div className="bg-gray-50 rounded-xl p-6 mb-3 aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/aavarampoo-tea.png"
                  alt="Aavarampoo Tea"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1">Aavarampoo Tea ( 100 g )</p>
              <p className="text-xs text-gray-600">Herbal health tea for wellness</p>
              <p className="text-base font-bold text-gray-800 mt-2">₹125</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews Section */}
      <section className="py-8 bg-primary bg-opacity-15">
        <div className="max-w-7xl mx-auto px-4">
          {/* Reviews Header */}
          <div className="bg-primary bg-opacity-20 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Reviews</h2>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              {/* Left - Rating Summary (80% width) */}
              <div className="flex items-start lg:items-center space-x-6 w-full lg:w-4/5">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {renderStars(product.rating)}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {product.rating}
                  </p>
                  <p className="text-sm text-gray-700">
                    ({product.reviews.toLocaleString()} Reviews)
                  </p>
                </div>
                
                {/* Center - Rating Distribution Bars */}
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center space-x-2">
                      <div className="flex items-center space-x-0.5 flex-shrink-0">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={`${
                              star <= item.stars
                                ? "text-yellow-400 fill-current"
                                : "text-yellow-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="w-40 h-2 bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Write Review Button (20% width) */}
              <button
                onClick={() => setShowReviewModal(true)}
                className="bg-black text-white font-semibold py-3 px-6 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap w-full lg:w-1/5"
              >
                <span>📝</span>
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Happy Clients Saying - Reviews Grid */}
        </div>
      </section>

      {/* Use Reviews Component for Happy Clients Saying */}
      <Reviews />

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-10 max-w-xl w-full relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-6 right-6 text-gray-700 hover:text-gray-900 text-2xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your Rating For Kavi's Naturals
            </h2>

            <form onSubmit={handleReviewSubmit}>
              {/* Star Rating - Outline Stars */}
              <div className="flex justify-center space-x-6 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-colors"
                  >
                    <Star
                      size={48}
                      className={`${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-yellow-300"
                      } transition-colors cursor-pointer`}
                      strokeWidth={1}
                    />
                  </button>
                ))}
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  Your Review
                </label>
                <textarea
                  value={reviewData.review}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, review: e.target.value })
                  }
                  placeholder="Share Details of Your Own Experiences at Kavi's Naturals"
                  className="w-full p-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-primary resize-none h-32 font-roboto bg-white text-gray-700"
                  required
                />
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Name (Required)
                  </label>
                  <input
                    type="text"
                    value={reviewData.name}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary font-roboto bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Email Address (Required)
                  </label>
                  <input
                    type="email"
                    value={reviewData.email}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, email: e.target.value })
                    }
                    placeholder="Your Email Address"
                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary font-roboto bg-white"
                    required
                  />
                </div>
              </div>

              {/* Place */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Place(Required)
                </label>
                <input
                  type="text"
                  value={reviewData.place}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, place: e.target.value })
                  }
                  placeholder="Place"
                  className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-primary font-roboto bg-white"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default ProductDetailPage;
