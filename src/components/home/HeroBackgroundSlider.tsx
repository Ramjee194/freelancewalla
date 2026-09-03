'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero_bpo_team.png',
    title: 'Reliable Freelance & BPO Services for Growing Businesses',
    subtitle: 'FreelanceWalla connects businesses with reliable support for sales, telecalling, customer service, chat, email, data entry and back-office operations.',
    badge: 'Verified  & Freelance Services',
  },
  {
    image: '/images/bpo_workspace.png',
    title: 'Dedicated Teams Trained on Your Business Process',
    subtitle: 'Adherence to call scripts, response guidelines, and operational SLAs to maintain professional customer communication.',
  },
  {
    image: '/images/bpo_support_call.png',
    title: 'Empathetic Customer Support & Live Chat Management',
    subtitle: 'Resolve inbound queries, reduce ticket response time, and increase customer satisfaction across call, chat, and email channels.',
  },
  {
    image: '/images/bpo_data_office.png',
    title: 'Accurate Data Entry & Administrative Back-Office Support',
    subtitle: 'Organize spreadsheets, update CRM records, handle document processing, and audit order records with high accuracy.',
  },
];

export default function HeroBackgroundSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slide transition timer every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">

      {/* Automatic Fullscreen Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.01 }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/60" />
      <div className="absolute inset-0 z-10 bg-grid-pattern-dark opacity-25" />

      {/* CENTERED CONTENT OVERLAY */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center justify-center space-y-6">

        {/* Animated Badge */}
        {heroSlides[currentSlide].badge && (
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/80 border border-blue-600/60 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            {heroSlides[currentSlide].badge}
          </motion.div>
        )}

        {/* Center-Aligned Title */}
        <motion.h1
          key={`title-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl text-center drop-shadow-md"
        >
          {heroSlides[currentSlide].title}
        </motion.h1>

        {/* Center-Aligned Subtitle */}
        <motion.p
          key={`sub-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl text-center drop-shadow-xs"
        >
          {heroSlides[currentSlide].subtitle}
        </motion.p>

        {/* Center-Aligned CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-xl hover:shadow-blue-500/30 scale-100 hover:scale-105"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white bg-slate-900/80 hover:bg-slate-800 transition-colors border border-slate-700 backdrop-blur-md"
          >
            View Our Services
          </Link>
        </motion.div>

        {/* Center-Aligned Trust Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300"
        >
          <div className="flex items-center gap-1.5 bg-slate-900/70 px-3.5 py-1.5 rounded-lg border border-slate-800 backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Flexible teams</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/70 px-3.5 py-1.5 rounded-lg border border-slate-800 backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Remote support</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/70 px-3.5 py-1.5 rounded-lg border border-slate-800 backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>Business-focused service</span>
          </div>
        </motion.div>

      </div>



    </div>
  );
}
