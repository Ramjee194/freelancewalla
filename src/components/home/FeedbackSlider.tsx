'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import { IReview } from '@/types';

interface FeedbackSliderProps {
  reviews: IReview[];
}

export default function FeedbackSlider({ reviews }: FeedbackSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    if (!reviews || reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews]);

  if (!reviews || reviews.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const currentReview = reviews[currentIndex];

  return (
    <div className="space-y-8">
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] bg-[#e6f4f0] border border-[#064E3B]/10 px-3 py-1 rounded-full">
            Client & Partner Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Client & Partner Feedback
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Transparent feedback from businesses and team members using our support services.
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-end gap-3">
          <Link
            href="/reviews"
            className="text-xs font-bold text-[#064E3B] hover:text-[#04382a] flex items-center gap-1 mr-2"
          >
            View All Reviews <ArrowRight className="w-4 h-4 text-[#064E3B]" />
          </Link>
        </div>
      </div>

      {/* ONE-BY-ONE CAROUSEL CONTAINER */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-[#064E3B]/15 shadow-xl overflow-hidden min-h-[260px] flex flex-col justify-between">
          
          <Quote className="w-24 h-24 text-[#e6f4f0] absolute -top-4 -right-4 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-6 relative z-10"
            >
              
              {/* Badge & Rating Stars */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#e6f4f0] text-[#064E3B] border border-[#064E3B]/20">
                  {currentReview.isSample ? 'Sample Review' : `${currentReview.reviewType} FEEDBACK`}
                </span>
                <div className="flex text-[#c69446] text-base">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentReview.rating ? 'fill-[#c69446] text-[#c69446]' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Text Quote */}
              <p className="text-slate-800 text-lg sm:text-xl font-medium italic leading-relaxed">
                "{currentReview.reviewText}"
              </p>

              {/* Reviewer Details */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#064E3B] text-base sm:text-lg">{currentReview.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">{currentReview.roleOrCompany}</p>
                </div>
                <span className="text-xs font-bold text-[#064E3B] bg-[#f8e7c9] px-3 py-1 rounded-lg border border-[#f8e7c9]">
                  {currentIndex + 1} of {reviews.length}
                </span>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Side Nav Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#064E3B] text-[#f8e7c9] hover:bg-[#04382a] transition-all shadow-lg z-20 border border-[#f8e7c9]/30"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#064E3B] text-[#f8e7c9] hover:bg-[#04382a] transition-all shadow-lg z-20 border border-[#f8e7c9]/30"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Centered Dots Indicator */}
        <div className="flex items-center justify-center gap-2 pt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentIndex === idx ? 'w-8 bg-[#064E3B]' : 'w-2.5 bg-slate-300 hover:bg-[#064E3B]/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </div>
  );
}
