import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useReducedMotion } from 'motion/react';
import { 
  Flower2, Waves, Circle, Feather, ArrowRight, Sparkles, Volume2, Droplet, ChevronLeft, ChevronRight, Globe,
  X, Play, CheckCircle2, ExternalLink
} from 'lucide-react';
import anandImg from '/anand.jpeg';
import { CarnaticVocalsModal } from './components/CarnaticVocalsModal';
import { DeviAratiSpotlight } from './components/DeviAratiSpotlight';
import { DeviAratiDetailsModal } from './components/DeviAratiDetailsModal';
import { ShayanaAratiDetailsModal } from './components/ShayanaAratiDetailsModal';
import { SoundaryaLahariDetailsModal } from './components/SoundaryaLahariDetailsModal';

/* --- UTILS --- */
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 2.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerChildren = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };
  return (
    <motion.div variants={variants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-10%" }} className={className}>
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } }
  };
  return <motion.div variants={variants}>{children}</motion.div>;
};

const ScrollParallax = ({ children, offset = 20, className = "" }: { children: React.ReactNode, offset?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const SectionLabel = ({ text, color = "text-sandalwood opacity-90" }: { text: string, color?: string }) => (
  <div className="flex items-center gap-4 mb-4 w-full">
    <div className={`h-[1px] w-8 md:w-16 bg-current opacity-30 ${color}`}></div>
    <div className={`w-1.5 h-1.5 rotate-45 border border-current opacity-60 ${color}`}></div>
    <span className={`text-[0.65rem] uppercase tracking-[0.4em] font-['Lato'] font-medium ${color}`}>
      {text}
    </span>
    <div className={`w-1.5 h-1.5 rotate-45 border border-current opacity-60 ${color}`}></div>
  </div>
);

const REFLECTIONS = [
  { text: "Anand shares the classical arts in an incredibly accessible way. There is a deep geometry, yet it feels entirely natural.", author: "Rajesh" },
  { text: "My weekly anchor. Whether it's the rhythm of chanting or classical music, I always step out far more joyful and still.", author: "Devi" },
  { text: "I finally managed to learn 'Parvati Panchakam'. The way he approaches pronunciation removes all hesitation and anxiety.", author: "Shreya" },
  { text: "He has a very calm presence. He simplifies the deep science of sound so naturally that it brings immediate clarity.", author: "Shraddha" },
  { text: "I never believed I had a voice for chanting, but his method built a natural, effortless joy inside me week by week.", author: "Bhumi" },
  { text: "A beautiful and practical way to experience these profound traditional arts. Highly grounded, and deeply enriching.", author: "Nagaraj" }
];

const MARQUEE_TEXT = [
  'ISHA CHANTS',
  'CLASSICAL MUSIC',
  'PURE TRANSMISSION',
  'TRADITIONAL ROOTS',
  'INNER BALANCE',
  'CARNATIC VOCALS',
  'NADA YOGA',
  'GEOMETRY OF SOUND',
  'BHAKTI SADHANA'
];

interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  objectPosition: string;
  headlineTop: string;
  headlineAccent: string;
  subheadline: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "hero-1",
    image: `${import.meta.env.BASE_URL}hero-1.jpg`,
    alt: "Artist playing tanpura in a serene traditional courtyard illuminated by a brass oil lamp",
    objectPosition: "72% center",
    headlineTop: "Sacred Chants &",
    headlineAccent: "Classical Music",
    subheadline: "Guided masterclasses for inner stillness",
  },
  {
    id: "hero-2",
    image: `${import.meta.env.BASE_URL}hero2.jpg`,
    alt: "Seekers sitting in meditative prayer around a lit brass lamp and incense in a pillared courtyard",
    objectPosition: "68% center",
    headlineTop: "A Living Practice",
    headlineAccent: "Of Shared Devotion",
    subheadline: "Timeless chants practiced together in stillness",
  },
  {
    id: "hero-3",
    image: `${import.meta.env.BASE_URL}hero-3.jpg`,
    alt: "Traditional wooden tanpura resting beside carved stone temple pillars and a glowing oil lamp",
    objectPosition: "65% center",
    headlineTop: "Sound as a Doorway",
    headlineAccent: "To Inner Balance",
    subheadline: "Rooted in classical lineage and pure resonance",
  },
  {
    id: "hero-4",
    image: `${import.meta.env.BASE_URL}hero-4.jpg`,
    alt: "Practitioner following a guided online session from home beside warm brass oil lamps",
    objectPosition: "68% center",
    headlineTop: "Bring Ancient Chants",
    headlineAccent: "Into Your Daily Life",
    subheadline: "Guided online sessions from the comfort of home",
  },
  {
    id: "hero-5",
    image: `${import.meta.env.BASE_URL}hero-5.jpg`,
    alt: "Devoted classical vocalist chanting beside an ancient temple pillar and brass lamp",
    objectPosition: "72% center",
    headlineTop: "Pure Transmission",
    headlineAccent: "Through Sacred Voice",
    subheadline: "Learn authentic pronunciation, melody, and depth",
  },
];

interface OfferingProgram {
  id: string;
  isVisible: boolean;
  image: string;
  sessionType: string;
  tags: string[];
  title: string;
  subtitle: string;
  price: string;
  buttonText: string;
  paymentUrl?: string;
}

const OFFERING_PROGRAMS: OfferingProgram[] = [
  {
    id: "guru-paduka-stotram",
    isVisible: true,
    image: `${import.meta.env.BASE_URL}guru-paduka-stotram.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "GURU PADUKA STOTRAM",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
    paymentUrl: "https://rzp.io/rzp/guru-paduka-stotram",
  },
  {
    id: "linga-bhairavi-shayana-arati",
    isVisible: true,
    image: `${import.meta.env.BASE_URL}shayan-arati.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "LINGA BHAIRAVI SHAYANA ARATI",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
    paymentUrl: "https://rzp.io/rzp/linga-bhairavi-shayan-arati",
  },
  {
    id: "soundarya-lahari",
    isVisible: true,
    image: `${import.meta.env.BASE_URL}soundarya-lahari.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "SOUNDARYA LAHARI",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
    paymentUrl: "https://rzp.io/rzp/soundarya-lahari",
  },
  {
    id: "gauranga",
    isVisible: false,
    image: `${import.meta.env.BASE_URL}gauranga.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "GAURANGA",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
  },
  {
    id: "parvati-panchakam",
    isVisible: false,
    image: `${import.meta.env.BASE_URL}parvati-panchakam.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "PARVATI PANCHAKAM",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
  },
  {
    id: "nirvana-shatakam",
    isVisible: false,
    image: `${import.meta.env.BASE_URL}nirvana-shatakam.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "NIRVANA SHATAKAM",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
  },
  {
    id: "bhairavi-stavan",
    isVisible: false,
    image: `${import.meta.env.BASE_URL}bhairavi-stavan.jpg`,
    sessionType: "RECORDED SESSION | 1 HR 30 MINS",
    tags: ["WORKSHOPS", "CHANTS"],
    title: "BHAIRAVI STAVAN",
    subtitle: "Lifetime Access",
    price: "INR 1500",
    buttonText: "EXPLORE PROGRAM",
  }
];

/* --- POST-PAYMENT PROGRAM REGISTRY --- */
type PurchasedProgramKey =
  | 'guru-paduka-stotram'
  | 'linga-bhairavi-shayana-arati'
  | 'soundarya-lahari';

const PURCHASED_PROGRAMS: Record<
  PurchasedProgramKey,
  { title: string; videoUrl: string; whatsappUrl: string }
> = {
  'guru-paduka-stotram': {
    title: 'Guru Paduka Stotram',
    videoUrl: 'https://www.youtube.com/watch?v=j3KVjUmz3Sk',
    whatsappUrl: 'https://chat.whatsapp.com/YOUR_COMMUNITY_LINK',
  },
  'linga-bhairavi-shayana-arati': {
    title: 'Linga Bhairavi Shayana Arati',
    videoUrl: 'https://www.youtube.com/watch?v=yp0bZDSm05Q',
    whatsappUrl: 'https://chat.whatsapp.com/YOUR_COMMUNITY_LINK',
  },
  'soundarya-lahari': {
    title: 'Soundarya Lahari',
    videoUrl: '',
    whatsappUrl: 'https://chat.whatsapp.com/YOUR_COMMUNITY_LINK',
  },
};

function resolvePurchasedProgramKey(raw?: string | null): PurchasedProgramKey | null {
  if (!raw) return null;
  const slug = raw.trim().toLowerCase();
  if (slug === 'guru-paduka-stotram') return 'guru-paduka-stotram';
  if (slug === 'linga-bhairavi-shayana-arati' || slug === 'linga-bhairavi-shayan-arati') {
    return 'linga-bhairavi-shayana-arati';
  }
  if (slug === 'soundarya-lahari') return 'soundarya-lahari';
  return null;
}

/* --- BEGIN YOUR JOURNEY: OFFERINGS CAROUSEL --- */
const ChantMarqueeSection = ({
  onOpenGuruPaduka,
  onOpenDeviArati,
  onOpenShayanaArati,
  onOpenSoundaryaLahari,
}: {
  onOpenGuruPaduka: () => void;
  onOpenDeviArati: () => void;
  onOpenShayanaArati: () => void;
  onOpenSoundaryaLahari: () => void;
}) => {
  const visiblePrograms = OFFERING_PROGRAMS.filter((program) => program.isVisible);
  const isCarousel = visiblePrograms.length > 3;

  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el || !isCarousel) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    if (!isCarousel) return;
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [isCarousel, visiblePrograms.length]);

  const scrollToNextSet = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidthWithGap = 400;
    const visibleCards = Math.max(1, Math.floor(el.clientWidth / cardWidthWithGap));
    const scrollAmount = visibleCards * cardWidthWithGap;
    
    el.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const trackContainerClass = isCarousel
    ? "w-full overflow-x-auto scroll-smooth scrollbar-none pt-[38px] pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-x snap-mandatory flex gap-7 md:gap-8"
    : visiblePrograms.length === 1
      ? "w-full max-w-[380px] mx-auto pt-[38px] pb-6 flex justify-center"
      : visiblePrograms.length === 2
        ? "w-full max-w-[800px] mx-auto pt-[38px] pb-6 grid grid-cols-1 sm:grid-cols-2 gap-7 md:gap-8"
        : "w-full pt-[38px] pb-6 flex flex-wrap justify-center lg:grid lg:grid-cols-3 gap-7 md:gap-8";

  const cardSizeClass = isCarousel
    ? "w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start"
    : visiblePrograms.length === 3
      ? "w-full max-w-[370px] sm:w-[320px] md:w-[340px] lg:w-full lg:max-w-none"
      : "w-full max-w-[380px] mx-auto";

  return (
    <div className="pt-10 pb-16 md:pb-28 w-full relative z-10 select-none overflow-hidden">
      {/* Header Block */}
      <div className="px-[6vw] md:px-[8vw] flex flex-col md:flex-row justify-between items-start md:items-end mb-[34px] gap-8">
        <div className="max-w-2xl">
          <SectionLabel text="Programs & Offerings" color="text-[#B84A32] opacity-80" />
          <h2 className="font-['Playfair_Display'] font-medium text-4xl md:text-5xl text-zinc-900 leading-tight">
            Begin Your <em className="text-gradient">Journey</em>
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <p className="max-w-[340px] text-zinc-800 text-sm md:text-base font-normal leading-relaxed text-left md:text-right">
            Carefully crafted online sessions designed to match your pace, from supportive group formats to personalized guidance.
          </p>
        </div>
      </div>

      {/* Complimentary Welcome Gift: Linga Bhairavi Devi Arati Spotlight Banner */}
      <DeviAratiSpotlight onExplore={onOpenDeviArati} />

      {/* Cards Viewport with Floating Navigation Arrows (when carousel is active) */}
      <div className="relative w-full px-[6vw] md:px-[8vw] group/carousel">
        {isCarousel && canScrollLeft && (
          <button
            onClick={() => scrollToNextSet('left')}
            aria-label="Previous set of cards"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white hover:text-white/80 active:scale-90 transition-all duration-200 cursor-pointer flex items-center justify-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft size={36} strokeWidth={2.5} />
          </button>
        )}

        <div 
          ref={trackRef}
          className={trackContainerClass}
        >
          {visiblePrograms.map((program) => {
            const isGuruPaduka =
              program.id === 'guru-paduka-stotram' ||
              program.title.trim().toLowerCase() === 'guru paduka stotram';
            const isShayanaArati =
              program.id === 'linga-bhairavi-shayana-arati' ||
              program.title.trim().toLowerCase() === 'linga bhairavi shayana arati';
            const isSoundaryaLahari =
              program.id === 'soundarya-lahari' ||
              program.title.trim().toLowerCase() === 'soundarya lahari';

            return (
              <div
                key={program.id}
                onClick={(e) => {
                  if (isGuruPaduka) {
                    onOpenGuruPaduka();
                    return;
                  }
                  if (isShayanaArati) {
                    onOpenShayanaArati();
                    return;
                  }
                  if (isSoundaryaLahari) {
                    onOpenSoundaryaLahari();
                    return;
                  }
                  if (!(e.target as HTMLElement).closest('a')) {
                    e.currentTarget.querySelector('a')?.click();
                  }
                }}
                className={`${cardSizeClass} bg-[#101724] border border-zinc-800/80 rounded-lg overflow-hidden flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:border-zinc-700 hover:shadow-[0_24px_55px_rgba(0,0,0,0.55)] transition-all duration-300 group cursor-pointer`}
              >
                <div>
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-900 shrink-0">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-6 sm:p-7 md:p-8 pb-7">
                    <p className="text-zinc-100 font-serif tracking-[0.14em] uppercase text-xs sm:text-sm font-medium mb-4">
                      {program.sessionType}
                    </p>

                    <div className="flex items-center gap-2.5 mb-5">
                      {program.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3.5 py-1 rounded-full border border-zinc-600/80 bg-zinc-800/40 text-[0.68rem] sm:text-xs font-['Lato'] font-medium uppercase tracking-wider text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-white font-serif uppercase tracking-wider font-semibold text-xl sm:text-2xl leading-snug mb-3">
                      {program.title}
                    </h3>

                    <p className="text-zinc-300 text-sm sm:text-base font-['Lato'] font-normal mb-5">
                      {program.subtitle}
                    </p>

                    <p className="text-white font-bold text-xl sm:text-2xl font-['Lato'] tracking-wide">
                      {program.price}
                    </p>
                  </div>
                </div>

                <a
                  href={program.paymentUrl || `https://wa.me/919790778251?text=${encodeURIComponent(`Hi, I would like to begin sadhana for ${program.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (isGuruPaduka || isShayanaArati || isSoundaryaLahari) {
                      e.preventDefault();
                    }
                  }}
                  className="w-full py-4 px-6 rounded-none bg-[#F4B41A] group-hover:bg-[#EE8426] text-center font-['Montserrat',sans-serif] text-[13.5px] tracking-[0.12em] uppercase text-[#111215] font-bold transition-colors duration-300 ease-in-out cursor-pointer block active:brightness-95"
                >
                  {program.buttonText}
                </a>
              </div>
            );
          })}
        </div>

        {isCarousel && canScrollRight && (
          <button
            onClick={() => scrollToNextSet('right')}
            aria-label="Next set of cards"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 text-white hover:text-white/80 active:scale-90 transition-all duration-200 cursor-pointer flex items-center justify-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] bg-black/40 hover:bg-black/70 rounded-full backdrop-blur-sm"
          >
            <ChevronRight size={36} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

/* --- RAZORPAY PAYMENT SUCCESS MODAL --- */
interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseKey: PurchasedProgramKey;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ isOpen, onClose, courseKey }) => {
  const program = PURCHASED_PROGRAMS[courseKey] || PURCHASED_PROGRAMS['guru-paduka-stotram'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0F1622] border border-[#8C7A5B]/70 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] p-6 sm:p-10 text-center overflow-hidden z-10"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-[#B84A32]/20 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#D4AF37]/15 blur-3xl pointer-events-none rounded-full" />

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={2} />
            </button>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B84A32]/40 bg-[#B84A32]/10 text-[#E87A60] text-[0.68rem] sm:text-xs font-['Lato'] tracking-[0.22em] uppercase font-medium mb-5">
              <span>WELCOME TO KALASTHANA FAMILY</span>
            </div>

            <div className="mx-auto w-14 h-14 rounded-full bg-[#18202D] border border-[#D4AF37]/50 flex items-center justify-center mb-5 shadow-inner relative">
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 animate-ping opacity-30 pointer-events-none" />
              <CheckCircle2 size={28} className="text-[#D4AF37]" strokeWidth={1.75} />
            </div>

            <h3 className="font-['Playfair_Display'] font-medium text-2xl sm:text-3xl text-[#FDFBF7] leading-snug mb-4">
              Namaskaram, Thank you for purchasing {program.title}.
            </h3>

            <p className="text-zinc-300 font-['Lato'] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Your official payment receipt has been emailed to you by Razorpay. You can watch your recorded masterclass right here:
            </p>

            <div className="flex flex-col gap-3.5">
              {program.videoUrl && (
                <a
                  href={program.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#B84A32] via-[#C95B42] to-[#B84A32] hover:brightness-110 text-white font-serif text-sm sm:text-base tracking-[0.16em] uppercase font-medium shadow-[0_10px_30px_rgba(184,74,50,0.35)] hover:shadow-[0_14px_40px_rgba(184,74,50,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group active:scale-[0.98]"
                >
                  <span>▶ WATCH MASTERCLASS</span>
                </a>
              )}

              <a
                href={program.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full border border-[#8C7A5B]/70 hover:border-[#E87A60] bg-[#141C28]/80 hover:bg-[#B84A32]/15 text-[#FDFBF7] hover:text-[#E87A60] text-xs sm:text-sm font-['Lato'] tracking-[0.12em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
              >
                <span>💬 JOIN KALASTHANA WHATSAPP COMMUNITY</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-6 rounded-full text-zinc-400 hover:text-zinc-200 text-xs font-['Lato'] tracking-[0.15em] uppercase transition-colors cursor-pointer mt-1"
              >
                Close & Return to Storefront
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* --- GURU PADUKA STOTRAM PROGRAM DETAILS MODAL --- */
interface GuruPadukaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl: string;
}

const GuruPadukaDetailsModal: React.FC<GuruPadukaDetailsModalProps> = ({ isOpen, onClose, paymentUrl }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {