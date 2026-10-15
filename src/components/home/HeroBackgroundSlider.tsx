'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, CheckCircle2, PhoneCall, Headphones, Sparkles } from 'lucide-react';

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero_bpo_team.png',
    title: 'Premier BPO Services & Verified Lead Generation',
    subtitle: 'Scale your business with dedicated telecalling, 24/7 customer support, inbound/outbound sales, and 100% exclusive, verified B2B & B2C client leads.',
    badge: 'Premier BPO & Lead Generation',
  },
  {
    image: '/images/bpo_support_call.png',
    title: '100% Exclusive, High-Intent Lead Generation',
    subtitle: 'Acquire verified client requirements with guaranteed zero lead-sharing. Once allocated, no other company receives this lead.',
    badge: 'Exclusive B2B & B2C Leads',
  },
  {
    image: '/images/bpo_workspace.png',
    title: 'Dedicated Inbound & Outbound Calling BPO Operations',
    subtitle: 'Trained telecallers, lead qualification executives, and sales outreach teams working on your custom scripts and operational SLAs.',
    badge: 'Telecalling & Outbound Sales',
  },
  {
    image: '/images/bpo_data_office.png',
    title: '24/7 Omnichannel Customer Support & Back-Office BPO',
    subtitle: 'Rapid query resolution, live chat desk, ticket handling, and meticulous data management to streamline your business operations.',
    badge: '24/7 BPO Support',
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
    <div className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#02241b] text-white">

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
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#02241b] via-[#04382a]/85 to-[#064E3B]/70" />
      <div className="absolute inset-0 z-10 bg-grid-pattern-dark opacity-30" />

      {/* CENTERED CONTENT OVERLAY */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center flex flex-col items-center justify-center space-y-6">

        {/* Animated Badge */}
        {heroSlides[currentSlide].badge && (
          <motion.div
            key={`badge-${currentSlide}`}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#064E3B]/90 border border-[#f8e7c9]/50 text-[#f8e7c9] text-xs font-bold tracking-wide backdrop-blur-md shadow-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#f8e7c9]" />
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
          className="text-base sm:text-xl text-[#f8e7c9]/90 leading-relaxed font-normal max-w-2xl text-center drop-shadow-xs"
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
            href="/agency-network"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-[#064E3B] bg-[#f8e7c9] hover:bg-[#edd4a6] transition-all shadow-xl hover:shadow-[#f8e7c9]/30 scale-100 hover:scale-105 border border-[#f8e7c9]"
          >
            <span>Explore Verified Leads</span>
            <ArrowRight className="w-5 h-5 text-[#064E3B]" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-[#f8e7c9] bg-[#064E3B]/80 hover:bg-[#064E3B] transition-colors border border-[#f8e7c9]/30 backdrop-blur-md"
          >
            Explore BPO Services
          </Link>
        </motion.div>

        {/* Center-Aligned Trust Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-6 border-t border-[#f8e7c9]/20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#f8e7c9]"
        >
          <div className="flex items-center gap-1.5 bg-[#064E3B]/70 px-3.5 py-1.5 rounded-lg border border-[#f8e7c9]/30 backdrop-blur-xs">
            <CheckCircle2 className="w-4 h-4 text-[#f8e7c9]" />
            <span>100% Exclusive Leads</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#064E3B]/70 px-3.5 py-1.5 rounded-lg border border-[#f8e7c9]/30 backdrop-blur-xs">
            <PhoneCall className="w-4 h-4 text-[#f8e7c9]" />
            <span>Inbound & Outbound Calling</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#064E3B]/70 px-3.5 py-1.5 rounded-lg border border-[#f8e7c9]/30 backdrop-blur-xs">
            <Headphones className="w-4 h-4 text-[#f8e7c9]" />
            <span>24/7 Customer Support Desk</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#064E3B]/70 px-3.5 py-1.5 rounded-lg border border-[#f8e7c9]/30 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-[#f8e7c9]" />
            <span>Zero Lead Sharing Guarantee</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
