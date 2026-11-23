import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ShayanaAratiDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentUrl?: string;
}

export const ShayanaAratiDetailsModal: React.FC<ShayanaAratiDetailsModalProps> = ({
  isOpen,
  onClose,
  paymentUrl = 'https://rzp.io/rzp/linga-bhairavi-shayan-arati',
}) => {
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
          {/* Dark Charcoal Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Parchment Sheet Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[780px] max-h-[90vh] bg-[#F5F1E8] text-zinc-900 rounded-sm shadow-[0_30px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="shayana-arati-modal-title"
          >
            {/* Top White Sticky Header */}
            <div className="bg-white border-b border-zinc-200 px-6 sm:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0 shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
              <div className="pr-8 sm:pr-0">
                <h2
                  id="shayana-arati-modal-title"
                  className="font-sans font-bold uppercase tracking-wide text-lg sm:text-xl text-zinc-900"
                >
                  LINGA BHAIRAVI SHAYANA ARATI
                </h2>
                <p className="font-['Lato'] text-xs sm:text-sm text-zinc-600 mt-1">
                  chant, devotional | English | Ages 7+ | Recorded online session
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
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

            {/* Scrollable Parchment Content */}
            <div className="overflow-y-auto px-6 sm:px-12 md:px-14 py-8 sm:py-10 text-left font-['Lato'] text-zinc-800">
              {/* About Section */}
              <section className="mb-8">
                <h3 className="font-['Playfair_Display'] font-normal text-2xl sm:text-[1.8rem] text-zinc-900 mb-4">
                  About
                </h3>
                <h4 className="font-sans font-bold text-sm sm:text-[0.95rem] text-zinc-900 mb-2.5">
                  A Sacred Evening Offering
                </h4>
                <p className="text-sm sm:text-[0.95rem] leading-[1.7] text-zinc-800">
                  Consecrated by Sadhguru, Linga Bhairavi is a vibrant manifestation of the Divine Feminine—an embodiment of fierce grace, strength, and boundless warmth. Offered each evening at the close of the daily cycle just before her abode closes for rest, the Linga Bhairavi Shayana Arati is a deeply meditative offering of fire that brings a calm, devotional stillness as the day winds down. Through the sacred flame of camphor or ghee lamps, this concluding arati enables devotees to connect effortlessly with Devi and receive her Grace as they retire for the night. Learn to chant this sacred evening offering with clarity and ease through this guided self-paced session.
                </p>

                <h4 className="font-sans font-bold text-sm sm:text-[0.95rem] text-zinc-900 mt-6 mb-2.5">
                  Highlights
                </h4>
                <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-[0.95rem] leading-[1.65] text-zinc-800">
                  <li>Learn the arati with the right pronunciation and melodic flow</li>
                  <li>Receive post-session support, which includes access to our WhatsApp community</li>
                </ul>
              </section>

              {/* Program Details Section */}
              <section>
                <h3 className="font-['Playfair_Display'] font-normal text-2xl sm:text-[1.8rem] text-zinc-900 mb-4">
                  Program Details
                </h3>
                <div className="space-y-3 text-sm sm:text-[0.95rem] text-zinc-800">
                  <p>
                    <strong className="font-bold text-zinc-900">Session Details:</strong> Pre-recorded video session (lifetime self-paced access via private streaming link)
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
                  <li>It is essential to watch and practice the complete video from start to finish in a single sitting without skipping ahead to learn the chant effectively.</li>
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
