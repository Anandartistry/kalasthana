import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, MessageCircle, Music, Calendar } from 'lucide-react';

interface CarnaticVocalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CountryCodeOption {
  label: string;
  value: string;
}

const COUNTRY_CODES: CountryCodeOption[] = [
  { label: 'IN (+91)', value: '+91' },
  { label: 'US/CA (+1)', value: '+1' },
  { label: 'UK (+44)', value: '+44' },
  { label: 'SG (+65)', value: '+65' },
  { label: 'UAE (+971)', value: '+971' },
  { label: 'AU (+61)', value: '+61' },
  { label: 'DE (+49)', value: '+49' },
];

const MUSICAL_BACKGROUNDS = [
  'Complete Beginner (No prior training)',
  'Basic Foundation (Familiar with Sarali / Geethams)',
  'Intermediate / Returning Practitioner',
];

const PREFERRED_DAYS = [
  'Weekdays',
  'Weekends',
  'Open to Both',
];

const PREFERRED_TIME_SLOTS = [
  '3:00 PM – 4:00 PM IST',
  '4:00 PM – 5:00 PM IST',
  '7:00 PM – 8:00 PM IST',
  '8:00 PM – 9:00 PM IST',
];

interface InquiryFormState {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  sameWhatsApp: boolean;
  whatsappCountryCode: string;
  whatsappNumber: string;
  musicalBackground: string;
  preferredDays: string;
  preferredTimeSlot: string;
  noteOrAge: string;
}

const INITIAL_FORM_STATE: InquiryFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCountryCode: '+91',
  phoneNumber: '',
  sameWhatsApp: true,
  whatsappCountryCode: '+91',
  whatsappNumber: '',
  musicalBackground: '',
  preferredDays: '',
  preferredTimeSlot: '',
  noteOrAge: '',
};

export const CarnaticVocalsModal: React.FC<CarnaticVocalsModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<InquiryFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const resetAndClose = () => {
    onClose();
    window.setTimeout(() => {
      setForm(INITIAL_FORM_STATE);
      setErrors({});
      setIsSubmitting(false);
      setSubmitError(null);
      setIsSubmitted(false);
    }, 250);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isSubmitted) {
          resetAndClose();
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, isSubmitted]);

  const updateField = <K extends keyof InquiryFormState>(field: K, value: InquiryFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError(null);
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = (): boolean => {
    const nextErrors: Partial<Record<keyof InquiryFormState, string>> = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'Required';
    if (!form.lastName.trim()) nextErrors.lastName = 'Required';

    const emailTrimmed = form.email.trim();
    if (!emailTrimmed) {
      nextErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      nextErrors.email = 'Please enter a valid email address';
    }

    if (!form.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required';
    } else if (form.phoneNumber.replace(/\D/g, '').length < 6) {
      nextErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!form.sameWhatsApp) {
      if (!form.whatsappNumber.trim()) {
        nextErrors.whatsappNumber = 'WhatsApp number is required';
      } else if (form.whatsappNumber.replace(/\D/g, '').length < 6) {
        nextErrors.whatsappNumber = 'Please enter a valid WhatsApp number';
      }
    }

    if (!form.musicalBackground) nextErrors.musicalBackground = 'Please select your level';
    if (!form.preferredDays) nextErrors.preferredDays = 'Required';
    if (!form.preferredTimeSlot) nextErrors.preferredTimeSlot = 'Required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
  const formattedPhone = `${form.phoneCountryCode} ${form.phoneNumber.trim()}`.trim();
  const displayWhatsApp = form.sameWhatsApp
    ? formattedPhone
    : `${form.whatsappCountryCode} ${form.whatsappNumber.trim()}`.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a70ab0a6-ba87-4731-88a8-7953057e2d3c',
          subject: `KALASTHANA - Carnatic Vocals Inquiry — ${fullName}`,
          from_name: 'KALASTHANA',
          'Full Name': fullName,
          Email: form.email.trim(),
          'Phone Number': formattedPhone,
          'WhatsApp Number': displayWhatsApp,
          'Musical Background': form.musicalBackground,
          'Preferred Days': form.preferredDays,
          'Preferred Time Slot (IST)': form.preferredTimeSlot,
          'Note / Student Age': form.noteOrAge.trim() || 'None',
        }),
      });

      const data = await response.json().catch(() => null);
      if (response.ok && data?.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(
          'Something went wrong while sending. Please try again or message us directly on WhatsApp.'
        );
      }
    } catch {
      setSubmitError(
        'Something went wrong while sending. Please try again or message us directly on WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/919790778251?text=${encodeURIComponent(
    `Namaskaram! I just submitted an inquiry for Carnatic Vocals Live Online Sessions.\n` +
      `Name: ${fullName}\n` +
      `Experience Level: ${form.musicalBackground}\n` +
      `Preferred Schedule: ${form.preferredDays}, ${form.preferredTimeSlot}` +
      (form.noteOrAge.trim() ? `\nNote / Age: ${form.noteOrAge.trim()}` : '')
  )}`;

  const inputBaseClass =
    "w-full rounded-md bg-white border border-[#DFD8C8] px-3.5 py-2.5 text-sm font-['Lato'] text-[#111215] placeholder:text-[#7A7469] focus:outline-none focus:border-[#EE8426] focus:ring-2 focus:ring-[#EE8426]/20 transition-colors";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={isSubmitted ? resetAndClose : onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Two-Column Warm Parchment Modal Box */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#F5F0E5] text-[#111215] rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.55)] border border-[#E5DEC9]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="carnatic-modal-title"
          >
            {/* Top-Right Close Button */}
            <button
              type="button"
              onClick={isSubmitted ? resetAndClose : onClose}
              aria-label="Close Carnatic Vocals modal"
              className="sticky sm:absolute top-4 right-4 ml-auto mt-4 mr-4 sm:m-0 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#111215] border border-[#E5DEC9] shadow-sm transition-colors cursor-pointer"
            >
              <X size={18} strokeWidth={2} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* LEFT COLUMN — LIVE CLASS OVERVIEW */}
              <div className="px-6 sm:px-9 lg:px-10 pt-4 sm:pt-10 pb-8 lg:py-10 lg:border-r border-[#E5DEC9] flex flex-col justify-between text-left">
                <div>
                  <h2
                    id="carnatic-modal-title"
                    className="font-['Playfair_Display'] font-medium text-2xl sm:text-3xl lg:text-[2rem] text-[#111215] leading-snug pr-8 lg:pr-0"
                  >
                    Carnatic Vocals — Live Online Sessions
                  </h2>

                  <p className="mt-3 text-[11px] sm:text-xs font-['Lato'] font-semibold uppercase tracking-[0.14em] text-[#4A463F] flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <span>Structured Classical Training</span>
                    <span className="text-[#4A463F]/60" aria-hidden="true">|</span>
                    <span>All Levels Welcome</span>
                    <span className="text-[#4A463F]/60" aria-hidden="true">|</span>
                    <span>Ages 7+</span>
                  </p>

                  <hr className="my-6 border-[#E5DEC9]" />

                  {/* What You Will Learn */}
                  <div className="mb-7">
                    <h3 className="font-['Playfair_Display'] font-medium text-xl text-[#111215] mb-3.5">
                      What You Will Learn
                    </h3>
                    <ul className="space-y-3 text-sm sm:text-[0.94rem] font-['Lato'] leading-relaxed text-[#2C2924]">
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84A32] shrink-0" aria-hidden="true" />
                        <span>
                          <strong className="font-bold text-[#111215]">Shruti &amp; Voice Culture:</strong> Pitch stability, breath control, and vocal culture.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84A32] shrink-0" aria-hidden="true" />
                        <span>
                          <strong className="font-bold text-[#111215]">Foundational Exercises:</strong> Step-by-step practice with Varisai, Alankaras, Nottu swarams, and Geethams.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84A32] shrink-0" aria-hidden="true" />
                        <span>
                          <strong className="font-bold text-[#111215]">Rhythm &amp; Timing:</strong> Keeping steady beat cycles (talam) naturally while singing.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84A32] shrink-0" aria-hidden="true" />
                        <span>
                          <strong className="font-bold text-[#111215]">Carnatic Songs &amp; Chants:</strong> Learning simple songs (for kids), devotional songs, chants, as well as Varnams and Kritis (for advanced students) with clear pronunciation.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Session Format */}
                  <div>
                    <h3 className="font-['Playfair_Display'] font-medium text-xl text-[#111215] mb-3.5">
                      Session Format
                    </h3>
                    <ul className="space-y-3 text-sm sm:text-[0.94rem] font-['Lato'] leading-relaxed text-[#2C2924]">
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84A32] shrink-0" aria-hidden="true" />
                        <span>
                          Live, interactive online sessions with real-time listening and guidance.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#B84A32] shrink-0" aria-hidden="true" />
                        <span>
                          Batch placement is matched to your current level and preferred schedule after we review your inquiry.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN — STATE 1 (FORM) OR STATE 2 (CONFIRMATION CARD) */}
              <div className="px-6 sm:px-9 lg:px-10 py-8 lg:py-10 bg-[#EFE9DA]/60 border-t lg:border-t-0 border-[#E5DEC9] flex flex-col justify-center text-left">
                {!isSubmitted ? (
                  <div>
                    <h3 className="font-['Playfair_Display'] font-medium text-2xl text-[#111215] mb-5 lg:pr-8">
                      Request Class Details
                    </h3>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      {/* 1. First Name & Last Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label htmlFor="carnatic-first-name" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                            First Name <span className="text-[#B84A32]">*</span>
                          </label>
                          <input
                            id="carnatic-first-name"
                            type="text"
                            required
                            value={form.firstName}
                            onChange={(e) => updateField('firstName', e.target.value)}
                            placeholder="First name"
                            className={`${inputBaseClass} ${errors.firstName ? 'border-[#B84A32]' : ''}`}
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.firstName}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="carnatic-last-name" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                            Last Name <span className="text-[#B84A32]">*</span>
                          </label>
                          <input
                            id="carnatic-last-name"
                            type="text"
                            required
                            value={form.lastName}
                            onChange={(e) => updateField('lastName', e.target.value)}
                            placeholder="Last name"
                            className={`${inputBaseClass} ${errors.lastName ? 'border-[#B84A32]' : ''}`}
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      {/* 2. Email Address */}
                      <div>
                        <label htmlFor="carnatic-email" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                          Email Address <span className="text-[#B84A32]">*</span>
                        </label>
                        <input
                          id="carnatic-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="you@example.com"
                          className={`${inputBaseClass} ${errors.email ? 'border-[#B84A32]' : ''}`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.email}</p>
                        )}
                      </div>

                      {/* 3. Country Code & Phone Number */}
                      <div>
                        <label htmlFor="carnatic-phone" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                          Country Code &amp; Phone Number <span className="text-[#B84A32]">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            aria-label="Phone country code"
                            value={form.phoneCountryCode}
                            onChange={(e) => updateField('phoneCountryCode', e.target.value)}
                            className="w-[125px] shrink-0 rounded-md bg-white border border-[#DFD8C8] px-2.5 py-2.5 text-sm font-['Lato'] text-[#111215] focus:outline-none focus:border-[#EE8426] focus:ring-2 focus:ring-[#EE8426]/20"
                          >
                            {COUNTRY_CODES.map((code) => (
                              <option key={code.value} value={code.value}>
                                {code.label}
                              </option>
                            ))}
                          </select>
                          <input
                            id="carnatic-phone"
                            type="tel"
                            required
                            value={form.phoneNumber}
                            onChange={(e) => updateField('phoneNumber', e.target.value)}
                            placeholder="Phone number"
                            className={`${inputBaseClass} ${errors.phoneNumber ? 'border-[#B84A32]' : ''}`}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.phoneNumber}</p>
                        )}

                        {/* Same WhatsApp Checkbox */}
                        <label className="mt-2.5 inline-flex items-center gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={form.sameWhatsApp}
                            onChange={(e) => updateField('sameWhatsApp', e.target.checked)}
                            className="w-4 h-4 rounded border-[#DFD8C8] text-[#EE8426] accent-[#111215] cursor-pointer"
                          />
                          <span className="text-xs sm:text-[13px] font-['Lato'] text-[#2C2924]">
                            My WhatsApp number is the same as my phone number
                          </span>
                        </label>
                      </div>

                      {/* Conditional Separate WhatsApp Number */}
                      <AnimatePresence initial={false}>
                        {!form.sameWhatsApp && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-0.5">
                              <label htmlFor="carnatic-whatsapp" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                                WhatsApp Country Code &amp; Number <span className="text-[#B84A32]">*</span>
                              </label>
                              <div className="flex gap-2">
                                <select
                                  aria-label="WhatsApp country code"
                                  value={form.whatsappCountryCode}
                                  onChange={(e) => updateField('whatsappCountryCode', e.target.value)}
                                  className="w-[125px] shrink-0 rounded-md bg-white border border-[#DFD8C8] px-2.5 py-2.5 text-sm font-['Lato'] text-[#111215] focus:outline-none focus:border-[#EE8426] focus:ring-2 focus:ring-[#EE8426]/20"
                                >
                                  {COUNTRY_CODES.map((code) => (
                                    <option key={code.value} value={code.value}>
                                      {code.label}
                                    </option>
                                  ))}
                                </select>
                                <input
                                  id="carnatic-whatsapp"
                                  type="tel"
                                  required={!form.sameWhatsApp}
                                  value={form.whatsappNumber}
                                  onChange={(e) => updateField('whatsappNumber', e.target.value)}
                                  placeholder="WhatsApp number"
                                  className={`${inputBaseClass} ${errors.whatsappNumber ? 'border-[#B84A32]' : ''}`}
                                />
                              </div>
                              {errors.whatsappNumber && (
                                <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.whatsappNumber}</p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 4. Musical Background */}
                      <div>
                        <label htmlFor="carnatic-background" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                          Musical Background <span className="text-[#B84A32]">*</span>
                        </label>
                        <select
                          id="carnatic-background"
                          required
                          value={form.musicalBackground}
                          onChange={(e) => updateField('musicalBackground', e.target.value)}
                          className={`${inputBaseClass} ${!form.musicalBackground ? 'text-[#7A7469]' : ''} ${errors.musicalBackground ? 'border-[#B84A32]' : ''}`}
                        >
                          <option value="" disabled>
                            Select your musical background
                          </option>
                          {MUSICAL_BACKGROUNDS.map((bg) => (
                            <option key={bg} value={bg} className="text-[#111215]">
                              {bg}
                            </option>
                          ))}
                        </select>
                        {errors.musicalBackground && (
                          <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.musicalBackground}</p>
                        )}
                      </div>

                      {/* 5. Preferred Schedule */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label htmlFor="carnatic-days" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                            Preferred Days <span className="text-[#B84A32]">*</span>
                          </label>
                          <select
                            id="carnatic-days"
                            required
                            value={form.preferredDays}
                            onChange={(e) => updateField('preferredDays', e.target.value)}
                            className={`${inputBaseClass} ${!form.preferredDays ? 'text-[#7A7469]' : ''} ${errors.preferredDays ? 'border-[#B84A32]' : ''}`}
                          >
                            <option value="" disabled>
                              Select days
                            </option>
                            {PREFERRED_DAYS.map((day) => (
                              <option key={day} value={day} className="text-[#111215]">
                                {day}
                              </option>
                            ))}
                          </select>
                          {errors.preferredDays && (
                            <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.preferredDays}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="carnatic-timeslot" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                            Preferred Time Slot (IST) <span className="text-[#B84A32]">*</span>
                          </label>
                          <select
                            id="carnatic-timeslot"
                            required
                            value={form.preferredTimeSlot}
                            onChange={(e) => updateField('preferredTimeSlot', e.target.value)}
                            className={`${inputBaseClass} ${!form.preferredTimeSlot ? 'text-[#7A7469]' : ''} ${errors.preferredTimeSlot ? 'border-[#B84A32]' : ''}`}
                          >
                            <option value="" disabled>
                              Select time slot
                            </option>
                            {PREFERRED_TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot} className="text-[#111215]">
                                {slot}
                              </option>
                            ))}
                          </select>
                          {errors.preferredTimeSlot && (
                            <p className="mt-1 text-xs font-['Lato'] text-[#B84A32]">{errors.preferredTimeSlot}</p>
                          )}
                        </div>
                      </div>

                      {/* 6. Optional Note / Student Age */}
                      <div>
                        <label htmlFor="carnatic-note" className="block text-xs font-['Lato'] font-bold uppercase tracking-wider text-[#4A463F] mb-1.5">
                          Note / Student Age (if under 18)
                        </label>
                        <input
                          id="carnatic-note"
                          type="text"
                          value={form.noteOrAge}
                          onChange={(e) => updateField('noteOrAge', e.target.value)}
                          placeholder="Any questions or student age if under 18 (optional)"
                          className={inputBaseClass}
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 px-6 rounded-md bg-[#111215] hover:bg-[#EE8426] text-[#F5F0E5] hover:text-[#111215] font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase transition-colors duration-300 ease-in-out cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-[#111215] disabled:hover:text-[#F5F0E5]"
                        >
                          {isSubmitting ? 'SENDING...' : 'SUBMIT'}
                        </button>
                        <p className="mt-2.5 text-center italic text-xs font-['Lato'] text-[#4A463F]">
                          (We will reach out to you within 24 hours with batch and fee details.)
                        </p>
                        {submitError && (
                          <p className="mt-2.5 text-center text-xs sm:text-[13px] font-['Lato'] text-red-700 leading-relaxed" role="alert">
                            {submitError}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                ) : (
                  /* STATE 2 — POST-SUBMISSION CONFIRMATION CARD */
                  <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-[#E5DEC9]">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFE9DA]">
                      <h3 className="font-['Playfair_Display'] font-medium text-2xl text-[#111215]">
                        {fullName}
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F4B41A] text-[#111215] font-['Montserrat',sans-serif] font-bold text-[11px] tracking-[0.08em] uppercase">
                        INQUIRY RECEIVED
                      </span>
                    </div>

                    {/* Submitted Details Summary List */}
                    <ul className="mt-5 space-y-3.5 text-sm font-['Lato'] text-[#2C2924]">
                      <li className="flex items-start gap-3">
                        <Mail size={16} className="mt-0.5 text-[#B84A32] shrink-0" />
                        <span className="break-all">{form.email.trim()}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <MessageCircle size={16} className="mt-0.5 text-[#B84A32] shrink-0" />
                        <span>{displayWhatsApp}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Music size={16} className="mt-0.5 text-[#B84A32] shrink-0" />
                        <span>{form.musicalBackground}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Calendar size={16} className="mt-0.5 text-[#B84A32] shrink-0" />
                        <span>
                          {form.preferredDays} &middot; {form.preferredTimeSlot}
                        </span>
                      </li>
                    </ul>

                    {/* Reassurance Note */}
                    <p className="mt-5 pt-4 border-t border-[#EFE9DA] text-sm font-['Lato'] leading-relaxed text-[#4A463F]">
                      Thank you for reaching out. We will connect with you on WhatsApp within 24 hours to confirm your batch and share fee details.
                    </p>

                    {/* Done Action + Subtle WhatsApp Link */}
                    <div className="mt-6 space-y-3 text-center">
                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="w-full py-3.5 px-6 rounded-md bg-[#111215] hover:bg-[#EE8426] text-[#F5F0E5] hover:text-[#111215] font-['Montserrat',sans-serif] font-bold text-[13.5px] tracking-[0.12em] uppercase transition-colors duration-300 ease-in-out cursor-pointer"
                      >
                        DONE
                      </button>

                      <div>
                        <a
                          href={whatsappInquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-[11px] font-['Montserrat',sans-serif] font-bold tracking-[0.12em] uppercase text-[#4A463F] hover:text-[#B84A32] transition-colors py-1"
                        >
                          MESSAGE ON WHATSAPP →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
