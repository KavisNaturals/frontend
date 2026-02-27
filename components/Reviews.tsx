"use client";

import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { reviewsApi, Review } from "@/lib/api";
import "swiper/css";

const FALLBACK_REVIEWS: Review[] = [
  { id: '1', rating: 5, comment: "Aloe vera shampoo is suitable for anyone, especially beneficial for those with dry or damaged hair. Its enzymes, vitamins, and minerals can soothe, nourish, and hydrate the scalp.", user_name: 'Ramya', createdAt: '' },
  { id: '2', rating: 5, comment: 'Milk protein shampoo is gentle and nourishing; regular use leaves hair soft and manageable. Great for daily use.', user_name: 'Priya', createdAt: '' },
  { id: '3', rating: 5, comment: "Amazing natural products! The organic detergent works wonderfully. Highly recommend Kavi's Naturals.", user_name: 'Anitha', createdAt: '' },
]

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS)

  useEffect(() => {
    reviewsApi.getFeatured(8)
      .then((data) => { if (data.length > 0) setReviews(data) })
      .catch(() => {})
  }, [])

  const renderStars = (rating: number) => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className={star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
      ))}
    </div>
  )

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title title-underline mb-4">What Our Customers Say</h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={reviews.length > 3}
          className="pb-8"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <Quote size={32} className="text-primary mb-4" />
                <p className="text-gray-700 text-sm flex-1 mb-4 line-clamp-4">{review.comment}</p>
                <div>
                  {renderStars(review.rating)}
                  <p className="font-semibold text-gray-900 mt-2">{review.user_name}</p>
                  {review.Product?.name && <p className="text-xs text-gray-500">{review.Product.name}</p>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Reviews
