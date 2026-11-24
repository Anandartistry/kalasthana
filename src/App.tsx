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

      <DeviAratiSpotlight onExplore={onOpenDeviArati} />

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
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[780px] max-h-[90vh] bg-[#F5F1E8] text-zinc-900 rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="guru-paduka-modal-title"
          >
            <div className="bg-white border-b border-zinc-200 px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0 shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
              <div className="pr-8 sm:pr-0">
                <h2
                  id="guru-paduka-modal-title"
                  className="font-sans font-bold uppercase tracking-wide text-lg sm:text-xl text-zinc-900"
                >
                  GURU PADUKA STOTRAM
                </h2>
                <p className="font-['Lato'] text-xs sm:text-sm text-zinc-600 mt-1">
                  chant, classical | English | Ages 7+ | Recorded online 1-hour session
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => localStorage.setItem('kalasthana_pending_course', 'guru-paduka-stotram')}
                  className="inline-flex items-center justify-center bg-[#F2B718] hover:bg-[#E2A80E] text-[#1A1610] font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase px-7 py-3.5 rounded-[3px] shadow-sm transition-colors whitespace-nowrap"
                >
                  GET ACCESS
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close program details"
                  className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-6 sm:px-12 md:px-14 py-8 sm:py-10 text-left font-['Lato'] text-zinc-800">
              <section className="mb-8">
                <h3 className="font-['Playfair_Display'] font-normal text-2xl sm:text-[1.8rem] text-zinc-900 mb-4">
                  About
                </h3>
                <h4 className="font-sans font-bold text-sm sm:text-[0.95rem] text-zinc-900 mb-2.5">
                  Basking In Grace
                </h4>
                <p className="text-sm sm:text-[0.95rem] leading-[1.7] text-zinc-800">
                  Composed by Adi Shankaracharya over a thousand years ago, Guru Paduka Stotram is a well-known Sanskrit chant expressing the importance of the Guru&apos;s grace. Walking on the banks of the river Narmada in search of his spiritual master, Adi Shankaracharya beheld the sandals of his Guru for the first time, and in an outpouring of devotion, recited the Guru Paduka Stotram. Reap the immense benefits of chanting these powerful verses through this guided self-paced session.
                </p>

                <h4 className="font-sans font-bold text-sm sm:text-[0.95rem] text-zinc-900 mt-6 mb-2.5">
                  Highlights
                </h4>
                <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-[0.95rem] leading-[1.65] text-zinc-800">
                  <li>Learn the chant with the right pronunciation</li>
                  <li>Receive post-session support, which includes access to our WhatsApp community</li>
                </ul>
              </section>

              <section>
                <h3 className="font-['Playfair_Display'] font-normal text-2xl sm:text-[1.8rem] text-zinc-900 mb-4">
                  Program Details
                </h3>
                <div className="space-y-3 text-sm sm:text-[0.95rem] text-zinc-800">
                  <p>
                    <strong className="font-bold text-zinc-900">Session Details:</strong> Pre-recorded 1-hour video session (self-paced access via private streaming link)
                  </p>
                  <p>
                    <strong className="font-bold text-zinc-900">Medium of Instruction:</strong> English
                  </p>
                  <p>
                    <strong className="font-bold text-zinc-900">Eligibility:</strong> Ages 7+
                  </p>
                </div>

                <h4 className="font-sans font-bold text-sm sm:text-[0.95rem] text-zinc-900 mt-6 mb-2.5">
                  Guidelines &amp; Requirements
                </h4>
                <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-[0.95rem] leading-[1.65] text-zinc-800">
                  <li>It is essential to watch and practice the complete 1-hour video from start to finish in a single sitting without skipping ahead to learn the chant effectively.</li>
                  <li>It is best to be in a private and quiet space where you can chant aloud.</li>
                  <li>Although not mandatory, it is supportive to maintain a light-stomach condition while practicing with the video.</li>
                  <li>Google Chrome version 85 or later (or any updated modern browser) is recommended for smooth playback.</li>
                  <li>A stable Wi-Fi or wired internet connection is recommended for uninterrupted video streaming.</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function App() {
  const [activeTheme, setActiveTheme] = useState('light');
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchasedCourseKey, setPurchasedCourseKey] = useState<PurchasedProgramKey>('guru-paduka-stotram');
  const [showGuruPadukaModal, setShowGuruPadukaModal] = useState(false);
  const [showDeviAratiModal, setShowDeviAratiModal] = useState(false);
  const [showShayanaAratiModal, setShowShayanaAratiModal] = useState(false);
  const [showSoundaryaLahariModal, setShowSoundaryaLahariModal] = useState(false);
  const [isCarnaticModalOpen, setIsCarnaticModalOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, [activeHeroSlide]);

  const currentHeroSlide = HERO_SLIDES[activeHeroSlide];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#\/?/, '?'));

    const rawCourseParam = searchParams.get('course') || hashParams.get('course');
    const explicitCourse = resolvePurchasedProgramKey(rawCourseParam);

    const hasRazorpayReturn =
      searchParams.has('razorpay_payment_id') ||
      searchParams.has('razorpay_payment_link_id') ||
      searchParams.get('razorpay_payment_link_status') === 'paid' ||
      searchParams.get('payment') === 'success' ||
      searchParams.get('payment_status') === 'success' ||
      searchParams.get('status') === 'success' ||
      searchParams.get('paid') === 'true' ||
      searchParams.get('payment_success') === 'true' ||
      searchParams.get('guru_paduka_success') === 'true' ||
      hashParams.has('razorpay_payment_id') ||
      hashParams.get('payment') === 'success';

    if (explicitCourse) {
      setPurchasedCourseKey(explicitCourse);
      setShowSuccessModal(true);
      localStorage.removeItem('kalasthana_pending_course');
    } else if (hasRazorpayReturn) {
      const storedCourse = resolvePurchasedProgramKey(
        localStorage.getItem('kalasthana_pending_course')
      );
      setPurchasedCourseKey(storedCourse || 'guru-paduka-stotram');
      setShowSuccessModal(true);
      localStorage.removeItem('kalasthana_pending_course');
    }
  }, []);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    if (window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.delete('course');
      url.searchParams.delete('razorpay_payment_id');
      url.searchParams.delete('razorpay_payment_link_id');
      url.searchParams.delete('razorpay_payment_link_status');
      url.searchParams.delete('razorpay_signature');
      url.searchParams.delete('payment');
      url.searchParams.delete('payment_status');
      url.searchParams.delete('status');
      url.searchParams.delete('paid');
      url.searchParams.delete('payment_success');
      url.searchParams.delete('guru_paduka_success');
      const cleanUrl = url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : '');
      window.history.replaceState({}, document.title, cleanUrl);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });

  const { scrollYProgress } = useScroll();
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div className="relative w-full overflow-x-hidden selection:bg-[#B84A32] selection:text-[#FDFBF7] font-['Lato'] font-normal bg-[#FDFBF7] text-zinc-900 flex flex-col">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 pointer-events-none transition-all duration-300 flex flex-col ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm text-zinc-900 border-b border-zinc-200" 
          : "bg-[#121213]/95 backdrop-blur-sm text-white border-b border-white/[0.08]"
      }`}>
        <div className="w-full px-6 md:px-12 lg:px-[6vw] h-16 md:h-[74px] flex justify-between items-center transition-all duration-300">
          <a
            href="#"
            className={`pointer-events-auto font-serif uppercase font-normal text-base md:text-lg tracking-[0.22em] no-underline transition-colors whitespace-nowrap shrink-0 ${
              isScrolled ? "text-zinc-900" : "text-[#DFC186] hover:text-[#EED39B]"
            }`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            KALASTHANA
          </a>
          <div className="hidden md:flex gap-9 items-center pointer-events-auto">
            <a
              href="#programs-section"
              className={`font-['Lato'] font-medium text-xs tracking-[0.18em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                isScrolled ? "text-zinc-800 hover:text-zinc-500" : "text-[#D8D3CA] hover:text-[#EED39B]"
              }`}
            >
              Programs
            </a>
            <a
              href="#guide"
              className={`font-['Lato'] font-medium text-xs tracking-[0.18em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                isScrolled ? "text-zinc-800 hover:text-zinc-500" : "text-[#D8D3CA] hover:text-[#EED39B]"
              }`}
            >
              Guide
            </a>
            <a
              href="#reflections"
              className={`font-['Lato'] font-medium text-xs tracking-[0.18em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 ${
                isScrolled ? "text-zinc-800 hover:text-zinc-500" : "text-[#D8D3CA] hover:text-[#EED39B]"
              }`}
            >
              Sharings
            </a>
            <a
              href="https://wa.me/919790778251"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-200 text-xs font-['Lato'] font-medium tracking-[0.16em] uppercase pointer-events-auto whitespace-nowrap shrink-0 ${
                isScrolled 
                  ? "bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-900" 
                  : "border border-[#C9A35B]/80 text-[#E5C687] hover:bg-[#E5C687] hover:text-[#121213]"
              }`}
            >
              <span>Begin Here</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      {/* --- ROOM 1: SPLIT-SCREEN HERO --- */}
      <ThemeSection id="arrival" bgClass="bg-[#121213]" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="w-full bg-[#121213] pt-16 md:pt-[74px]">
          <div className="relative w-full min-h-[calc(100svh-4rem)] md:min-h-[calc(100svh-74px)] bg-[#121213] flex flex-col lg:flex-row lg:items-stretch overflow-hidden">
            
            <div className="relative w-full h-[46vh] min-h-[300px] sm:h-[52vh] lg:h-auto lg:min-h-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[72%] bg-[#181716] overflow-hidden order-1 lg:order-2">
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={currentHeroSlide.id}
                  src={currentHeroSlide.image}
                  alt={currentHeroSlide.alt}
                  referrerPolicy="no-referrer"
                  initial={{
                    opacity: 0,
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
                    scale: prefersReducedMotion ? 1 : 1.02,
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    filter: prefersReducedMotion ? "blur(0px)" : "blur(8px)",
                    scale: prefersReducedMotion ? 1 : 1.01,
                  }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ objectPosition: currentHeroSlide.objectPosition }}
                  className="absolute inset-0 w-full h-full object-cover lg:object-right select-none will-change-[opacity,filter,transform]"
                />
              </AnimatePresence>
              <div
                className="hidden lg:block absolute inset-y-0 left-0 w-[44%] bg-gradient-to-r from-[#121213] via-[#121213]/85 to-transparent pointer-events-none z-10"
                aria-hidden="true"
              />
              <div
                className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121213] via-[#121213]/60 to-transparent pointer-events-none z-10"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 w-full lg:w-[46%] xl:w-[44%] bg-[#121213] lg:bg-transparent px-6 sm:px-10 lg:pl-[6vw] lg:pr-10 py-12 sm:py-16 lg:py-20 flex flex-col justify-center items-start text-left order-2 lg:order-1">
              <div className="max-w-xl w-full">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentHeroSlide.id}
                    initial={{ opacity: 0, filter: prefersReducedMotion ? "blur(0px)" : "blur(6px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: prefersReducedMotion ? "blur(0px)" : "blur(6px)", transition: { duration: 0.45, ease: "easeIn" } }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h1 className="font-['Playfair_Display'] font-normal text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[3.85rem] leading-[1.12] tracking-[-0.01em] mb-5 md:mb-6">
                      <span className="block text-[#FDFBF7]">{currentHeroSlide.headlineTop}</span>
                      <span className="block bg-gradient-to-r from-[#FCE8B8] via-[#E5B563] to-[#C97B32] bg-clip-text text-transparent">
                        {currentHeroSlide.headlineAccent}
                      </span>
                    </h1>

                    <p className="font-['Lato'] font-normal text-base sm:text-lg lg:text-[1.2rem] leading-[1.55] tracking-[0.01em] text-[#D8D6D0] mb-8 md:mb-10 max-w-md">
                      {currentHeroSlide.subheadline}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center rounded-full bg-[#F4B41A] hover:bg-[#EE8426] text-[#111215] font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase px-8 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4B41A]"
                  >
                    EXPLORE PROGRAMS →
                  </button>
                  <button
                    type="button"
                    onClick={() => document.getElementById('devi-arati-spotlight')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center rounded-full border border-[#C89B54]/75 bg-white/[0.03] hover:bg-[#C89B54]/15 hover:border-[#F4B41A] text-[#FCE8B8] hover:text-white font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase px-7 py-4 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89B54]"
                  >
                    FREE DEVI ARATI
                  </button>
                </div>

                <div className="mt-10 flex items-center gap-2.5" role="tablist" aria-label="Hero slides">
                  {HERO_SLIDES.map((slide, index) => {
                    const isActive = index === activeHeroSlide;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Show slide ${index + 1}: ${slide.headlineTop} ${slide.headlineAccent}`}
                        onClick={() => setActiveHeroSlide(index)}
                        className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${
                          isActive
                            ? "w-8 bg-[#E5B563]"
                            : "w-4 bg-white/20 hover:bg-white/45"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </ThemeSection>

      {/* Marquee Banner */}
      <div className="w-full bg-[#F3EFEA] border-y border-zinc-200 py-5 overflow-hidden flex whitespace-nowrap relative z-10">
          <div className="flex w-max animate-marquee text-sm font-['Lato'] tracking-[0.2em] uppercase font-medium text-[#B84A32] items-center px-6">
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  {MARQUEE_TEXT.map((text, j) => (
                    <React.Fragment key={`${i}-${j}`}>
                      <span className="mr-12">{text}</span>
                      <span className="text-[#B84A32]/80 mr-12 text-xs">◇</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
          </div>
      </div>

      {/* --- ROOM 2: OUR APPROACH --- */}
      <ThemeSection 
        id="philosophy" 
        bgClass="relative z-20 overflow-hidden" 
        theme="light" 
        setActiveTheme={setActiveTheme}
      >
        <div 
          className="absolute inset-0 bg-[#1A1E21] z-0 pointer-events-none"
          style={{
            clipPath: 'polygon(0 calc(100% - 6.5rem), calc(50% + 3rem) calc(100% - 2.5rem), 0 100%)',
            WebkitClipPath: 'polygon(0 calc(100% - 6.5rem), calc(50% + 3rem) calc(100% - 2.5rem), 0 100%)',
            transform: 'translate(-4rem, -2rem)',
          }}
          aria-hidden="true"
        />

        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}Texture-white.jpg)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5.5rem))',
            WebkitClipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5.5rem))',
          }}
          aria-hidden="true"
        />

        <div className="w-full relative z-10 pb-44 md:pb-72">
          <div className="relative w-full">
            <div 
              className="absolute inset-0 bg-black z-0 pointer-events-none"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0% 100%)',
                WebkitClipPath: 'polygon(0 0, 100% 0, 100% 82%, 0% 100%)',
              }}
              aria-hidden="true"
            />

            <div 
              className="bg-[#0B1320] w-full pt-20 md:pt-28 pb-56 md:pb-72 px-4 relative overflow-hidden z-10"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 82%, 28% 95%, 0 84%)',
                WebkitClipPath: 'polygon(0 0, 100% 0, 100% 82%, 28% 95%, 0 84%)',
              }}
            >
              <div 
                className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
                aria-hidden="true"
              >
                <div 
                  className="w-full h-full bg-cover bg-no-repeat bg-right mix-blend-luminosity translate-x-8 sm:translate-x-16 md:translate-x-24 translate-y-6 sm:translate-y-10 md:translate-y-14"
                  style={{
                    backgroundImage: `url(${import.meta.env.BASE_URL}Tanpura.jpg)`,
                    WebkitMaskImage: 'radial-gradient(ellipse at 88% 55%, black 25%, transparent 68%)',
                    maskImage: 'radial-gradient(ellipse at 88% 55%, black 25%, transparent 68%)',
                  }}
                />
              </div>

              <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <FadeIn className="text-left max-w-3xl">
                    <h2 className="font-serif uppercase tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight md:leading-none select-none">
                      <span className="font-normal tracking-[0.08em] text-[#FDFBF7]">Sound as a</span> <br/> 
                      <span className="font-bold tracking-tight text-white">
                        Doorway to <span className="bg-gradient-to-r from-[#FCE8B8] via-[#E5B563] to-[#C97B32] bg-clip-text text-transparent">Self-Transformation</span>
                      </span>
                    </h2>
                    <p className="font-['Lato'] font-light text-base md:text-xl mt-6 text-zinc-300 leading-relaxed max-w-2xl">
                      Kalasthana brings traditional chanting and classical music out of performance halls and into your daily life. Designed for every seeker, these art forms are offered not merely to be learned, but to be lived—turning sound into a passage toward inner stillness.
                    </p>
                </FadeIn>
              </div>
            </div>
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 -mt-52 sm:-mt-60 md:-mt-64">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
               {[
                 {
                   title: "A JOYFUL EXPLORATION",
                   desc: "No prior experience is needed to begin. Whether you are just starting out or looking to deepen your practice, we make exploring classical chanting and music simple, enjoyable, and rewarding for all skill levels.",
                   img: `${import.meta.env.BASE_URL}joyful-exploration.jpg`
                 },
                 {
                   title: "TRANSFORMATIVE FOR BODY & MIND",
                   desc: "Beyond simply learning a skill, these timeless practices offer a profound sense of inner balance. Experience true stress reduction, cultural enrichment, and a natural blossoming of your physical and mental well-being.",
                   img: `${import.meta.env.BASE_URL}transformative-body-mind.jpg`
                 },
                 {
                   title: "ROOTED IN LIVING TRADITION",
                   desc: "Learn through intimate, interactive sessions anchored in authentic classical lineages. As dedicated practitioners of the art, we don’t just teach technique—we nurture your connection to the living essence of the practice.",
                   img: `${import.meta.env.BASE_URL}guru-shishya-roots.jpg`
                 }
               ].map((item, index) => (
                  <div 
                     key={index}
                     onMouseEnter={() => setHoveredCard(index)}
                     onMouseLeave={() => setHoveredCard(null)}
                     className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)] h-[420px] md:h-[520px] cursor-pointer transition-all duration-500 bg-zinc-950
                       ${hoveredCard !== null && hoveredCard !== index ? 'grayscale opacity-50 scale-[0.98]' : 'scale-100'}`
                     }
                  >
                     <img 
                        src={item.img} 
                        alt={item.title} 
                        className={`absolute inset-0 object-cover w-full h-full transition-transform duration-700 ${hoveredCard === index ? 'scale-110' : 'scale-100'}`} 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-10 transition-opacity duration-500"></div>
                     <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-20"></div>
                     
                     <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 flex flex-col justify-end">
                         <h3 className={`text-white font-serif uppercase tracking-wider font-semibold text-lg md:text-xl transition-all duration-500 transform text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${hoveredCard === index ? 'translate-y-0 text-white' : 'translate-y-6 md:translate-y-10'}`}>
                           {item.title}
                         </h3>
                         <div className={`mt-3 overflow-hidden transition-all duration-500 ${hoveredCard === index ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0'}`}>
                             <p className="text-zinc-300 font-['Lato'] font-normal text-sm md:text-base leading-relaxed text-left drop-shadow-sm">
                               {item.desc}
                             </p>
                         </div>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 3: INTAKE (OFFERINGS) --- */}
      <ThemeSection id="programs-section" bgClass="bg-[#F3EFEA] text-zinc-900 relative z-10 -mt-12 md:-mt-16 pt-12 md:pt-16" theme="light" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-5"></div>
        
        <ChantMarqueeSection
          onOpenGuruPaduka={() => setShowGuruPadukaModal(true)}
          onOpenDeviArati={() => setShowDeviAratiModal(true)}
          onOpenShayanaArati={() => setShowShayanaAratiModal(true)}
          onOpenSoundaryaLahari={() => setShowSoundaryaLahariModal(true)}
        />

        <div className="relative w-full overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}texture-white.jpeg`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          />
          <div
            className="absolute inset-0 bg-[#FDFBF7]/30 pointer-events-none z-0"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F3EFEA] to-transparent pointer-events-none z-0"
            aria-hidden="true"
          />

          <div className="pt-8 md:pt-16 pb-16 md:pb-20 w-full px-[8vw] md:px-[10vw] relative z-10">
            <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24 mt-12 md:mt-20">
               <motion.div style={{ y: yParallaxFast }} className="w-full md:w-1/2 relative">
                  <div className="w-full aspect-[4/5] bg-[#FDFBF7] artifact-mask rounded-xl shadow-[0_18px_45px_rgba(0,0,0,0.14)] relative overflow-hidden group">
                     <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply z-20 transition-opacity duration-[2s] group-hover:opacity-40"></div>
                     <img src={`${import.meta.env.BASE_URL}string.jpeg`} alt="Carnatic Music" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-[3s] group-hover:scale-105 opacity-90" />
                     <div className="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-[2s] group-hover:opacity-0">
                       <Volume2 size={40} strokeWidth={0.5} className="text-zinc-900/50" />
                     </div>
                  </div>
               </motion.div>
               <div className="w-full md:w-1/2 flex flex-col justify-center">
                 <FadeIn>
                   <SectionLabel text="◇ THE CLASSICAL FOUNDATION ◇" color="text-[#B84A32] opacity-90" />
                   <ScrollParallax>
                     <h2 className="font-['Playfair_Display'] font-medium text-4xl md:text-5xl text-zinc-900 leading-tight">
                        Carnatic Vocals
                     </h2>
                   </ScrollParallax>
                   <p className="mt-10 text-zinc-900 text-base md:text-lg font-normal leading-relaxed mb-4">
                     Born from a profound understanding of sound and consciousness, Carnatic music is more than an art form—it is a disciplined vehicle for inner stillness. Modern science increasingly echoes what practitioners have experienced for centuries: conscious vocal practice aligns the breath, steadies the mind, and brings balance to the human system.
                   </p>
                   <p className="text-zinc-900 text-base md:text-lg font-normal leading-relaxed mb-6">
                     No prior musical background is required. Whether you are taking your very first step into classical music or returning to deepen an existing practice, our interactive live online sessions offer structured, unhurried guidance rooted in traditional pedagogy.
                   </p>
                   <p className="text-[11px] sm:text-xs font-['Lato'] font-medium uppercase tracking-[0.14em] text-[#4A463F] mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
                     <span>LIVE ONLINE SESSIONS</span>
                     <span className="text-[#4A463F]/60" aria-hidden="true">|</span>
                     <span>ALL LEVELS WELCOME</span>
                     <span className="text-[#4A463F]/60" aria-hidden="true">|</span>
                     <span>PERSONALIZED GUIDANCE</span>
                   </p>
                   <button
                     type="button"
                     onClick={(e) => {
                       e.preventDefault();
                       e.stopPropagation();
                       setIsCarnaticModalOpen(true);
                     }}
                     className="inline-flex w-max items-center justify-center rounded-md px-7 py-3.5 bg-[#111215] hover:bg-[#EE8426] text-[#FDFBF7] hover:text-[#111215] transition-colors duration-300 ease-in-out font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase cursor-pointer"
                   >
                     JOIN LIVE CLASSES
                   </button>
                 </FadeIn>
               </div>
            </div>
          </div>

          <div className="w-full overflow-hidden leading-none relative z-10" aria-hidden="true">
            <svg
              viewBox="0 0 1440 90"
              preserveAspectRatio="none"
              className="block w-full h-16 md:h-24 -mb-px"
            >
              <polygon fill="#1D2025" points="0,82 1440,20 1440,90 0,90" />
              <polygon fill="#0A0B0D" points="0,82 810,47 1440,84 1440,90 0,90" />
            </svg>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 4: THE GUIDE (LINEAGE) --- */}
      <ThemeSection id="guide" bgClass="bg-[#0A0B0D] text-[#F5F0E6] relative" theme="dark" setActiveTheme={setActiveTheme}>
        <div className="py-24 md:py-32 w-full px-[8vw] md:px-[10vw] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <FadeIn className="lg:col-span-5 relative">
              <div className="w-full aspect-[3/4] relative overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl">
                <img src={anandImg} alt="Anand Sreenivasan" className="relative z-10 w-full h-full object-cover transition-transform duration-[3s] hover:scale-105" />
              </div>
            </FadeIn>
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <FadeIn>
                <SectionLabel text="The Founder" color="text-[#C89B54]" />
                <ScrollParallax>
                  <h2 className="font-['Playfair_Display'] font-medium tracking-wide text-4xl md:text-5xl lg:text-6xl text-[#F5F0E6]">
                    Anand <em className="not-italic text-[#C89B54]">Sreenivasan</em>
                  </h2>
                </ScrollParallax>
                
                <p className="mt-10 text-lg md:text-xl text-[#EAE4D7] italic mb-10 leading-relaxed font-normal border-l-2 border-[#C89B54] pl-6 py-2">
                  "This is not just an art form; <br/>it is a profound tool to discover one's inner balance."
                </p>
                
                <div className="space-y-6 text-[#B8B2A6] text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-12">
                  <p>
                    Anand spent over a decade as a classical music teacher at Isha Samskriti (now Sadhguru Gurukulam) and performed as a vocalist and flautist with Sounds of Isha, where he also composed and tuned several chants and songs. Today, he shares this traditional foundation in a patient, structured way—helping students build a steady and joyful practice.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 border-t border-white/15 pt-10">
                  <div>
                    <div className="text-2xl md:text-[1.7rem] font-['Playfair_Display'] font-medium not-italic text-[#F5F0E6] mb-2 leading-snug">
                      10+ Years Teaching
                    </div>
                    <div className="font-['Montserrat',sans-serif] text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#A89F91] font-semibold leading-relaxed">
                      FACULTY, ISHA SAMSKRITI (SADHGURU GURUKULAM)
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-[1.7rem] font-['Playfair_Display'] font-medium not-italic text-[#F5F0E6] mb-2 leading-snug">
                      Sounds of Isha
                    </div>
                    <div className="font-['Montserrat',sans-serif] text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#A89F91] font-semibold leading-relaxed">
                      VOCALIST &amp; CLASSICAL PRACTITIONER
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/919790778251?text=Namaskaram%20Anand%2C%20I%20visited%20Kalasthana%20and%20would%20love%20to%20connect."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-block font-['Montserrat',sans-serif] font-bold text-xs tracking-widest uppercase text-[#C89B54] hover:text-[#F5F0E6] transition-colors duration-200"
                >
                  GET IN TOUCH →
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 6: REFLECTIONS MASONRY --- */}
      <ThemeSection id="reflections" bgClass="bg-[#FDFBF7] text-zinc-900 relative" theme="light" setActiveTheme={setActiveTheme}>
        <div className="pt-12 pb-24 md:pb-32 w-full flex flex-col border-t border-zinc-200">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <SectionLabel text="Reflections" color="text-[#B84A32] opacity-90" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto mt-10 px-4 md:px-8">
             {REFLECTIONS.slice(0, 4).map((ref, idx) => (
                <div key={idx} className="relative overflow-hidden p-10 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 rounded-2xl flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] hover:border-[#B84A32]/40">
                   <span className="absolute -top-4 right-6 text-[12rem] text-zinc-100 font-['Playfair_Display'] leading-none select-none">"</span>
                   <p className="relative z-10 text-zinc-900 text-base md:text-lg font-normal leading-relaxed mb-10">
                     {ref.text}
                   </p>
                   <div>
                     <hr className="w-12 border-[#B84A32]/40 mb-4" />
                     <div className="text-[#B84A32] font-['Lato'] font-semibold tracking-widest text-sm uppercase">
                        {ref.author}
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </ThemeSection>

      {/* --- ROOM 7: DEPARTURE --- */}
      <ThemeSection id="departure" bgClass="bg-[#F3EFEA] text-zinc-900 relative" theme="light" setActiveTheme={setActiveTheme}>
        <div className="mandala-mask z-0 opacity-5"></div>
        <div className="py-24 md:py-32 w-full flex flex-col items-center justify-center text-center px-[8vw] md:px-[10vw] relative z-10 border-t border-zinc-200">
           <FadeIn className="flex flex-col items-center">
             <Flower2 size={32} strokeWidth={1} className="text-[#B84A32]/50 mx-auto mb-12" />
             <h2 className="text-5xl md:text-[5rem] lg:text-[6rem] font-['Playfair_Display'] italic font-medium leading-[1.1] mb-12 max-w-4xl tracking-normal text-zinc-900">
               Step into a space of inner harmony.
             </h2>
             <p className="text-zinc-900 text-base md:text-lg font-normal max-w-xl mx-auto mb-16">
               Connect with us to find the precise pathway for your current depth of seeking.
             </p>
             <a 
               href="https://wa.me/919790778251" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex w-max items-center gap-4 rounded-full px-8 py-3 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 text-xs font-['Lato'] tracking-[0.4em] uppercase text-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
             >
               <span className="font-medium relative z-10">Connect With Us</span>
               <ArrowRight size={16} className="relative z-10" />
             </a>
           </FadeIn>
        </div>
        <footer className="w-full text-center py-12 text-[0.6rem] uppercase tracking-[0.4em] text-zinc-400 border-t border-zinc-200">
            KALASTHANA &nbsp; | &nbsp; {new Date().getFullYear()}
        </footer>
      </ThemeSection>

      {/* FLOATING ACTION */}
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 2 }}
          className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 transition-colors duration-1000 text-zinc-900 hover:text-[#B84A32]"
        >
          <a 
            href="https://wa.me/919790778251" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-zinc-200 hover:scale-110 transition-all duration-500 hover:shadow-[0_16px_40px_rgb(0,0,0,0.15)]"
          >
             <Sparkles size={20} strokeWidth={1.5} className="mr-0.5" />
          </a>
        </motion.div>
      </AnimatePresence>

      {/* RAZORPAY PAYMENT SUCCESS MODAL */}
      <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        courseKey={purchasedCourseKey}
      />

      {/* GURU PADUKA STOTRAM PROGRAM DETAILS MODAL */}
      <GuruPadukaDetailsModal
        isOpen={showGuruPadukaModal}
        onClose={() => setShowGuruPadukaModal(false)}
        paymentUrl="https://rzp.io/rzp/guru-paduka-stotram"
      />

      {/* LINGA BHAIRAVI DEVI ARATI PROGRAM DETAILS MODAL */}
      <DeviAratiDetailsModal
        isOpen={showDeviAratiModal}
        onClose={() => setShowDeviAratiModal(false)}
        paymentUrl="https://rzp.io/rzp/linga-bhairavi-devi-arati"
      />

      {/* LINGA BHAIRAVI SHAYANA ARATI PROGRAM DETAILS MODAL */}
      <ShayanaAratiDetailsModal
        isOpen={showShayanaAratiModal}
        onClose={() => setShowShayanaAratiModal(false)}
        paymentUrl="https://rzp.io/rzp/linga-bhairavi-shayan-arati"
      />

      {/* SOUNDARYA LAHARI PROGRAM DETAILS MODAL */}
      <SoundaryaLahariDetailsModal
        isOpen={showSoundaryaLahariModal}
        onClose={() => setShowSoundaryaLahariModal(false)}
        paymentUrl="https://rzp.io/rzp/soundarya-lahari"
      />

      {/* CARNATIC VOCALS LIVE ONLINE SESSIONS SPLIT MODAL */}
      <CarnaticVocalsModal
        isOpen={isCarnaticModalOpen}
        onClose={() => setIsCarnaticModalOpen(false)}
      />

    </div>
  );
}

const ThemeSection = ({ id, bgClass, theme, children, setActiveTheme, style }: { id: string, bgClass: string, theme: string, children: React.ReactNode, setActiveTheme: any, style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) {
      setActiveTheme(theme);
    }
  }, [inView, theme, setActiveTheme]);

  return (
    <section ref={ref} id={id} className={`w-full relative transition-colors duration-[1.5s] ease-in-out ${bgClass}`} style={style}>
      {children}
    </section>
  );
};

export default App;