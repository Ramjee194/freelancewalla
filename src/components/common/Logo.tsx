import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export default function Logo({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
}: LogoProps) {
  // Dimensions for the icon
  const dimensions: Record<string, { height: number; width: number }> = {
    sm: { height: 38, width: 38 },
    md: { height: 46, width: 46 },
    lg: { height: 58, width: 58 },
  };

  const { height, width } = dimensions[size] || dimensions.md;

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 focus:outline-none group select-none ${className}`}
      aria-label="FreelanceWalla – Connecting Talent with Opportunities"
    >
      {/* ── Brand SVG Emblem ── */}
      <div
        className={`relative shrink-0 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 ${
          variant === 'dark'
            ? 'bg-[#064E3B] p-1 ring-1 ring-[#f8e7c9]/30 shadow-md'
            : 'bg-white shadow-sm ring-1 ring-[#064E3B]/10 p-0.5'
        }`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Image
          src="/icon.svg"
          alt="FreelanceWalla Emblem"
          width={width}
          height={height}
          className="w-full h-full object-contain"
          priority
          unoptimized
        />
      </div>

      {/* ── Wordmark & Tagline ── */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-black tracking-tight ${
              size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl'
            }`}
          >
            <span className={variant === 'dark' ? 'text-white' : 'text-[#064E3B]'}>
              Freelance
            </span>
            <span className={variant === 'dark' ? 'text-[#f8e7c9]' : 'text-[#064E3B]'}>
              Walla
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-[#f8e7c9] border border-[#064E3B]/20 ml-0.5 align-baseline"></span>
          </span>
          <span
            className={`text-[8.5px] font-bold uppercase tracking-[0.14em] mt-0.5 ${
              variant === 'dark' ? 'text-[#f8e7c9]/80' : 'text-[#064E3B]/70'
            }`}
          >
            Connecting Talent with Opportunities
          </span>
        </div>
      )}
    </Link>
  );
}
