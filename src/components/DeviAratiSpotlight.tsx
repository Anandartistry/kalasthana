import React from 'react';

interface DeviAratiSpotlightProps {
  onExplore: () => void;
}

const DEVI_ARATI_TAGS = [
  'Guided Breakdown',
  'Pronunciation & Cadence',
  'Lifetime Access',
];

export const DeviAratiSpotlight: React.FC<DeviAratiSpotlightProps> = ({ onExplore }) => {
  return (
    <div
      id="devi-arati-spotlight"
      className="scroll-mt-24 md:scroll-mt-28 w-full px-[6vw] md:px-[8vw] relative z-10"
    >
      <div className="w-full bg-[#11151E] border border-[#C89B54]/40 rounded-xl overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.32)] flex flex-col lg:flex-row relative group">
        {/* LEFT PANEL (42%) — Devi Arati Visual */}
        <div className="relative w-full lg:w-[42%] min-h-[250px] sm:min-h-[300px] lg:min-h-[390px] bg-[#11151E] overflow-hidden shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}linga-bhairavi-devi-arati.jpg`}
            alt="Linga Bhairavi Devi Arati"
            className="absolute inset-0 w-full h-full object-cover object-[62%_28%] group-hover:scale-105 transition-transform duration-700"
          />

          {/* Smooth horizontal dissolve into #11151E right panel (desktop) */}
          <div
            className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent via-[#11151E]/75 to-[#11151E] pointer-events-none z-20"
            aria-hidden="true"
          />
          {/* Smooth bottom dissolve into #11151E panel (mobile / stacked viewports) */}
          <div
            className="lg:hidden absolute inset-x-0 -bottom-px h-28 bg-gradient-to-t from-[#11151E] via-[#11151E]/75 to-transparent pointer-events-none z-20"
            aria-hidden="true"
          />
        </div>

        {/* RIGHT PANEL (58%) — Content & Conversion */}
        <div className="relative w-full lg:w-[58%] bg-[#11151E] px-6 sm:px-9 lg:px-11 py-8 sm:py-10 lg:py-11 flex flex-col justify-between text-left overflow-hidden">
          {/* Low-Opacity Sacred Lotus / Geometric Mandala Watermark (~4.5% opacity) */}
          <svg
            viewBox="0 0 320 320"
            fill="none"
            className="absolute -right-14 -top-10 w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] text-[#C89B54] opacity-[0.045] pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            <circle cx="160" cy="160" r="144" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="160" cy="160" r="118" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="160" cy="160" r="88" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="160" cy="160" r="54" stroke="currentColor" strokeWidth="1" />
            <circle cx="160" cy="160" r="18" stroke="currentColor" strokeWidth="1.2" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
              <g key={angle} transform={`rotate(${angle} 160 160)`}>
                <path
                  d="M160 20 C176 58, 176 92, 160 120 C144 92, 144 58, 160 20 Z"
                  stroke="currentColor"
                  strokeWidth="1.1"
                />
                <path
                  d="M160 72 C170 96, 170 116, 160 138 C150 116, 150 96, 160 72 Z"
                  stroke="currentColor"
                  strokeWidth="0.9"
                />
              </g>
            ))}
            <polygon
              points="160,46 258,216 62,216"
              stroke="currentColor"
              strokeWidth="1"
            />
            <polygon
              points="160,274 258,104 62,104"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          <div className="relative z-10">
            {/* Eyebrow Pill & Inline Recorded Session Label */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C89B54]/[0.12] border border-[#C89B54]/30 font-['Montserrat',sans-serif] font-semibold text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] text-[#E5B96B]">
                COMPLIMENTARY WELCOME GIFT
              </span>
              <span className="font-['Montserrat',sans-serif] font-semibold text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#C89B54]">
                &bull; RECORDED SESSION
              </span>
            </div>

            {/* Two-Tone Serif Headline */}
            <h2 className="font-['Playfair_Display'] uppercase font-medium text-2xl sm:text-[1.85rem] lg:text-[2.1rem] tracking-[0.04em] leading-tight mb-4">
              <span className="text-[#FAF8F5]">LINGA BHAIRAVI </span>
              <em className="italic text-[#E5B96B]">DEVI ARATI</em>
            </h2>

            {/* Description with Strategic Bolding */}
            <p className="font-['Lato'] font-normal text-sm sm:text-base text-[#9DA4B2] leading-relaxed max-w-xl mb-6">
              Offer yourself at Devi&apos;s feet through this sacred chant—taught{' '}
              <strong className="font-semibold text-[#FAF8F5]">phrase by phrase</strong> with{' '}
              <strong className="font-semibold text-[#FAF8F5]">exact pronunciation</strong> and{' '}
              <strong className="font-semibold text-[#FAF8F5]">traditional cadence</strong>.
            </p>

            {/* High-Contrast Feature Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-7">
              {DEVI_ARATI_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C89B54]/[0.08] border border-[#C89B54]/[0.32] font-['Lato'] text-[11.5px] sm:text-xs font-medium tracking-wide text-[#E8E4DC]"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[#F4B41A] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Subtle Horizontal Gold Hairline Divider & Bottom Action Row */}
          <div className="relative z-10 border-t border-[rgba(200,155,84,0.20)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            {/* Left Side: Logical Price + Reassurance Grouping */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-['Lato'] text-sm sm:text-base text-zinc-400/80 line-through tracking-wide">
                  INR 1500
                </span>
                <span className="font-['Montserrat',sans-serif] font-bold text-base sm:text-lg tracking-[0.06em] text-[#F4B41A]">
                  COMPLIMENTARY (₹0)
                </span>
              </div>
              <p className="mt-1 font-['Lato'] text-[12px] leading-relaxed text-[#B8BDC7]">
                Enter ₹0 at checkout for free access, or contribute as you wish.
              </p>
            </div>

            {/* Right Side: High-Intent CTA Button */}
            <button
              type="button"
              onClick={onExplore}
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-md bg-[#F4B41A] hover:bg-[#EE8426] text-[#111215] font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase transition-colors duration-300 ease-in-out cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:brightness-95 whitespace-nowrap shrink-0"
            >
              RECEIVE FREE ACCESS →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
