import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
}: LogoProps) {
  const emblemHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-13 sm:h-16',
  };

  const textSizes = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
  };

  const isDark = variant === 'dark';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group font-sans tracking-tight focus:outline-hidden ${className}`}
      aria-label="FreelanceWalla Home"
    >
      {/* ULTRA-PREMIUM BRAND EMBLEM */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src="/images/brand_logo.svg"
          alt="FreelanceWalla Emblem"
          className={`${emblemHeights[size]} w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-md`}
        />
      </div>

      {/* ULTRA-PREMIUM TYPOGRAPHY & BRANDING */}
      {showText && (
        <div className="flex flex-col justify-center select-none">
          <div className="flex items-center gap-1 leading-none">
            {/* Freelance */}
            <span className={`font-black ${textSizes[size]} tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Freelance
            </span>

            {/* Walla (Gradient Text) */}
            <span className="font-black text-xl sm:text-2xl lg:text-3xl tracking-tight bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 bg-clip-text text-transparent drop-shadow-2xs">
              Walla
            </span>


          </div>

          {/* Premium Sub-tagline */}
          <span className={`text-[9px] font-bold uppercase tracking-[0.22em] mt-1 block font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
            Outsourcing & Support Platform
          </span>
        </div>
      )}
    </Link>
  );
}
