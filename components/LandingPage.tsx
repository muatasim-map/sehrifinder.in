import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
  Moon, MapPin, ShieldCheck, Users,
  Heart, Coffee, Bus, BookOpen,
  ArrowRight, Menu, X, Mail, AlertCircle, ChevronDown, CheckCircle, PlusCircle
} from 'lucide-react';
import { IslamicPattern, IslamicDivider, IslamicCorner, IslamicFiligree, IslamicStar } from './Pattern';
import { Logo } from './Logo';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ParallaxLantern } from './ParallaxLantern';

// Configs & Components
import { APP_CONFIG } from '../config';
import { LANTERN_CONFIG } from '../config/lanterns';
import { fadeInUp, staggerContainer, textReveal } from '../config/animations';
import { FeatureCard } from './landing/FeatureCard';
import { HelpCard } from './landing/HelpCard';
import { DisclaimerSection } from './landing/DisclaimerSection';
import { CityCard } from './landing/CityCard';
import { COUNTRIES } from '../data/locations';
import { toSlug } from '../utils/slug';
import { useSEO } from '../hooks/useSEO';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenSubmit: () => void;
  onSelectCity: (city: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onOpenSubmit, onSelectCity }) => {
  useSEO(''); // Reset SEO for landing page
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Check if running on mobile to disable parallax (fixes INP)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  // Parallax Transforms - disabled on mobile for performance
  const heroBgY = useTransform(scrollY, [0, 1000], isMobile ? [0, 0] : [0, 150]);
  const bismillahY = useTransform(scrollY, [0, 1000], isMobile ? [0, 0] : [0, 200]);
  const heroContentY = useTransform(scrollY, [0, 1000], isMobile ? [0, 0] : [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], isMobile ? [1, 1] : [1, 0]);

  // Handle header background on scroll - use passive listener to avoid blocking scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleVolunteer = () => {
    onOpenSubmit();
  };

  const currentYear = 2026;

  return (
    <div className="font-landing-body text-neutral-800 overflow-x-hidden w-full bg-emerald-midnight">
      {/* GLOBAL STYLES */}
      <style>{`
        @keyframes sway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes sway-slow { 0%, 100% { transform: rotate(-2deg); } 50% { transform: rotate(2deg); } }
        @keyframes sway-fast { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
        @keyframes shadow-pulse { 0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.3); transform: scale(1); } 50% { box-shadow: 0 0 50px rgba(212,175,55,0.6); transform: scale(1.02); } }
        @keyframes flicker-candle { 0%, 100% { opacity: 0.8; transform: scale(1); filter: blur(4px); } 50% { opacity: 0.6; transform: scale(0.95); filter: blur(3px); } 25% { opacity: 0.9; transform: scale(1.05); filter: blur(5px); } 75% { opacity: 0.7; transform: scale(0.9); filter: blur(3.5px); } }
        @keyframes ripple { 0% { transform: scale(0.95); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
        .animate-ripple { animation: ripple 1.5s infinite linear; }
        .text-shadow-gold { text-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
        .lantern-glow-core { mix-blend-mode: screen; }
      `}</style>

      {/* NAVBAR */}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-emerald-midnight/95 backdrop-blur-md py-3 shadow-lg border-b border-gold-lantern/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div
            className="flex items-center gap-2 text-neutral-pearl animate-fade-in cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo variant={isScrolled ? 'dark' : 'gold'} />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-landing-accent font-medium text-neutral-pearl/90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <button onClick={() => scrollToSection('story')} className="hover:text-gold-lantern transition-colors">About</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-gold-lantern transition-colors">Features</button>
            <button onClick={handleVolunteer} className="hover:text-gold-lantern transition-colors">Volunteer</button>
            <a href="https://www.lighthousementoring.org/" target="_blank" rel="noopener noreferrer" className="text-gold-lantern hover:text-gold-bright transition-colors font-bold whitespace-nowrap">Have doubts about Islam?</a>
            <button
              onClick={onEnterApp}
              className="px-6 py-2 bg-white/10 border border-white/20 rounded-full text-neutral-pearl font-bold text-sm hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm shadow-sm"
            >
              Launch App
            </button>
          </div>

          <button className="md:hidden text-neutral-pearl p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute top-full left-0 right-0 bg-emerald-midnight p-6 border-t border-white/10 flex flex-col gap-4 md:hidden shadow-xl animate-fade-in">
              <button onClick={() => scrollToSection('story')} className="text-left text-neutral-pearl py-2 border-b border-white/5">About</button>
              <button onClick={() => scrollToSection('features')} className="text-left text-neutral-pearl py-2 border-b border-white/5">Features</button>
              <button onClick={handleVolunteer} className="text-left text-neutral-pearl py-2 border-b border-white/5">Volunteer</button>
              <a href="https://www.lighthousementoring.org/" target="_blank" rel="noopener noreferrer" className="text-left text-gold-lantern py-2 border-b border-white/5 font-bold">Have doubts about Islam?</a>
              <button onClick={onEnterApp} className="bg-gold-lantern text-emerald-midnight w-full py-3 rounded-lg font-bold mt-2">Launch App</button>
            </div>
          </>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-emerald-midnight pt-20 pb-32">
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0 will-change-transform pointer-events-none"
        >
          <IslamicPattern variant="geometric" opacity={0.15} className="text-gold-lantern scale-110" />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-emerald-midnight/50 to-emerald-midnight z-0 pointer-events-none"></div>

        {/* ARABIC BACKGROUND - hidden on mobile for performance */}
        <motion.div
          style={{ y: bismillahY }}
          className="absolute top-[25%] md:top-[20%] left-1/2 -translate-x-1/2 z-10 opacity-35 md:opacity-20 pointer-events-none select-none w-full text-center"
        >
          <span className="font-arabic-calligraphy text-[120px] md:text-[280px] text-gold-antique leading-none whitespace-nowrap blur-[0.5px] text-shadow-gold">
            رمضان كريم
          </span>
        </motion.div>

        {/* --- DYNAMIC LANTERNS --- */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {LANTERN_CONFIG.map((lantern) => (
            <ParallaxLantern key={lantern.id} lantern={lantern} scrollY={scrollY} />
          ))}
        </div>

        <motion.div
          style={{ y: heroContentY, opacity: heroOpacity }}
          className="relative z-30 container mx-auto px-4 text-center mt-10 will-change-transform"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gold-lantern/10 border border-gold-lantern/20 text-gold-lantern text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.15)]"
          >
            <ShieldCheck className="w-4 h-4 text-gold-bright" />
            <span>Ramadan {currentYear} Edition</span>
          </motion.div>

          <motion.h1
            variants={textReveal}
            initial="hidden"
            animate="visible"
            className="font-landing-heading text-4xl md:text-8xl text-neutral-pearl mb-6 drop-shadow-2xl leading-[1.2] md:leading-[1.1]"
          >
            Find Verified <br className="hidden md:block" />
            <span className="text-gold-lantern font-script italic px-2">
              Sehri & Suhoor
            </span>
            Spots Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-landing-body text-xl md:text-2xl text-neutral-ivory/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Find verified Sehri spots, free community meals, and Masjid distributions near you.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-slide-up mb-12" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onEnterApp}
              className="group relative px-10 py-5 bg-[#D4AF37] hover:bg-[#C5A028] text-emerald-midnight font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:shadow-[0_8px_30px_rgba(255,215,0,0.4)] flex items-center gap-3"
            >
              <span>Find Spots Near Me</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleVolunteer}
              className="px-10 py-5 bg-white/5 border border-white/10 text-white font-medium rounded-full text-lg hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-3 backdrop-blur-md group"
            >
              <Users className="w-5 h-5 text-gold-lantern group-hover:scale-110 transition-transform" />
              Volunteer
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-12 text-center border-t border-white/10 pt-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div>
              <div className="text-xl md:text-3xl font-bold text-gold-lantern font-landing-heading">12</div>
              <div className="text-[8px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1">Cities</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-bold text-gold-lantern font-landing-heading">400+</div>
              <div className="text-[8px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1">Spots</div>
            </div>
            <div>
              <div className="text-xl md:text-3xl font-bold text-gold-lantern font-landing-heading">100%</div>
              <div className="text-[8px] md:text-xs text-neutral-400 uppercase tracking-widest mt-1">Verified</div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 opacity-50 z-20">
          <span className="text-[10px] uppercase tracking-widest text-gold-antique">Scroll</span>
          <ChevronDown className="w-4 h-4 text-gold-antique" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px] drop-shadow-xl">
            <path d="M0 80V20C240 20 480 80 720 0C960 80 1200 20 1440 20V80H0Z" fill="#faf8f3" />
          </svg>
        </div>
      </section>

      {/* HADITH SECTION */}
      <section className="relative py-20 bg-cream border-b border-gold-lantern/10">
        <div className="container mx-auto px-6 text-center max-w-4xl relative z-10 reveal">
          <div className="inline-block mb-8">
            <IslamicStar className="w-10 h-10 text-gold-lantern mx-auto animate-float" />
          </div>

          <div className="relative">
            <div className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 w-32 justify-center">
              <IslamicDivider className="text-gold-antique/50 w-full" />
            </div>
            <div className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 w-32 justify-center">
              <IslamicDivider className="text-gold-antique/50 w-full" />
            </div>

            <blockquote className="font-serif font-medium text-2xl md:text-3xl lg:text-4xl text-emerald-midnight leading-snug mb-6 italic px-4 relative tracking-wide">
              "Whoever provides food for a fasting person to break his fast will have a reward like his, without decreasing the reward of the fasting person."
            </blockquote>
          </div>

          <cite className="block text-sm md:text-base text-emerald-sacred/70 font-landing-accent font-bold tracking-widest uppercase mt-4">
            — Jami’ at-Tirmidhi (Hasan Sahih)
          </cite>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="py-24 bg-cream relative">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <IslamicPattern variant="hexagonal" className="text-emerald-midnight" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8 text-center md:text-left">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="flex items-center justify-center md:justify-start gap-3 mb-2"
              >
                <IslamicStar className="w-4 h-4 text-gold-antique" />
                <span className="text-gold-antique text-sm font-bold uppercase tracking-widest">Why We Exist</span>
                <IslamicStar className="w-4 h-4 text-gold-antique" />
              </motion.div>

              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textReveal}
                className="font-landing-heading text-4xl md:text-6xl text-emerald-midnight leading-tight"
              >
                Every Ramadan, thousands wake before dawn — <span className="text-gold-antique italic relative inline-block">
                  but too many wake alone.
                  <svg className="absolute -bottom-2 left-0 w-full h-2 text-gold-antique/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-landing-body text-lg text-emerald-midnight/70 space-y-6 leading-relaxed bg-white/50 backdrop-blur-sm p-8 rounded-lg border-2 border-gold-lantern/60 shadow-sm relative hover:shadow-lg transition-shadow duration-300"
              >
                <div className="absolute -top-2 -left-2 text-gold-antique">
                  <IslamicCorner />
                </div>
                <div className="absolute -bottom-2 -right-2 text-gold-antique rotate-180">
                  <IslamicCorner />
                </div>

                <p>
                  Some have families to share Sehri with. Others — students in hostels, workers in new cities, travelers far from home — eat alone. Or skip it entirely.
                </p>

                <div className="my-8 pl-6 md:pl-8 border-l-[3px] border-gold-antique py-3 bg-emerald-50/30 rounded-r-xl relative shadow-sm">
                  <p className="font-landing-body italic text-[1.2875rem] md:text-[1.545rem] text-emerald-midnight mb-4 leading-snug tracking-wider">
                    "He is not a believer whose stomach is filled while the neighbor to his side goes hungry."
                  </p>
                  <p className="text-[11.3px] md:text-[12.3px] font-bold uppercase tracking-[0.2em] text-gold-antique font-landing-accent">
                    — PROPHET MUHAMMAD (ﷺ)
                  </p>
                </div>

                <p>
                  Across our cities, Masjids prepare communal meals. Trusts set up distribution points. Local restaurants keep their kitchens running through the night.
                  But the information is scattered — buried in WhatsApp groups, word of mouth, and handwritten notices on walls.
                </p>
                <p className="font-medium text-emerald-midnight text-xl">
                  Sehri Finder connects you to them. One directory. Verified. Community-led.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 bg-emerald-midnight relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-lantern to-transparent opacity-30"></div>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <IslamicPattern variant="arabesque" className="text-gold-lantern" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-10"
          >
            <div className="text-gold-lantern text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold-lantern/50"></span>
              What You Will Find
              <span className="h-px w-8 bg-gold-lantern/50"></span>
            </div>
            <h2 className="font-landing-heading text-4xl md:text-5xl text-neutral-pearl">
              More Than a Meal. <span className="text-gold-lantern italic">A Community.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
          >
            <FeatureCard
              delay={0}
              icon={<Moon className="w-6 h-6" />}
              title="Masjid Sehri"
              tag="Community Driven"
              desc="Experience the blessings of communal Sehri in Masjids, complete with Tahajjud prayers and community warmth."
            />
            <FeatureCard
              delay={100}
              icon={<Coffee className="w-6 h-6" />}
              title="Free Distribution"
              tag="No Cost, No Conditions"
              desc="Discover verified trust-run spots providing free, dignified meals for anyone in need. Open to all."
            />
            <FeatureCard
              delay={200}
              icon={<Heart className="w-6 h-6" />}
              title="Women-Friendly"
              tag="Safe & Segregated"
              desc="Find locations with dedicated family sections, purdah arrangements, and safe environments for sisters."
            />
            <FeatureCard
              delay={300}
              icon={<Users className="w-6 h-6" />}
              title="Travelers & Students"
              tag="Away From Home"
              desc="Hostelers, students, and travelers—find a welcoming Sehri spot near railway stations, bus stands, and campuses."
            />
          </motion.div>
        </div>
      </section>

      {/* QURANIC VERSE SECTION */}
      <section className="py-20 bg-emerald-midnight relative border-t border-white/5 border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <IslamicPattern variant="hexagonal" className="text-gold-lantern" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex justify-center">
          <div className="reveal max-w-3xl w-full bg-white/[0.02] backdrop-blur-md border border-gold-lantern/20 rounded-lg p-10 md:p-14 text-center relative overflow-hidden group hover:border-gold-lantern/30 transition-colors duration-500">
            <div className="absolute top-4 left-4 text-gold-antique/40">
              <IslamicFiligree />
            </div>
            <div className="absolute bottom-4 right-4 text-gold-antique/40 rotate-180">
              <IslamicFiligree />
            </div>

            <div className="mb-8">
              <span className="text-gold-antique text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 opacity-80">
                <span className="w-1 h-1 rounded-full bg-gold-antique"></span>
                The Divine Command
                <span className="w-1 h-1 rounded-full bg-gold-antique"></span>
              </span>
            </div>

            <p className="font-arabic-text text-2xl md:text-3xl lg:text-4xl text-neutral-pearl leading-[2.2] mb-6 drop-shadow-sm px-4" dir="rtl" lang="ar">
              وَكُلُوا وَاشْرَبُوا حَتَّىٰ يَتَبَيَّنَ لَكُمُ ٱلْخَيْطُ ٱلْأَبْيَضُ مِنَ ٱلْخَيْطِ ٱلْأَسْوَدِ مِنَ ٱلْفَجْرِ ثُمَّ أَتِمُّوا ٱلصِّيَامَ إِلَى ٱلَّيْلِ
            </p>

            <div className="w-1/2 mx-auto my-6">
              <IslamicDivider className="text-gold-antique/30" />
            </div>

            <p className="font-landing-body text-base md:text-lg text-neutral-ivory/70 leading-relaxed italic max-w-xl mx-auto mb-8">
              “And eat and drink until the white thread of dawn becomes distinct from the black thread [of night]. Then complete the fast until sunset…”
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-antique/10 bg-gold-antique/5 text-gold-antique/70 text-[10px] font-landing-accent uppercase tracking-widest">
              <span>Surah Al-Baqarah</span>
              <span className="w-px h-3 bg-gold-antique/20"></span>
              <span>2:187</span>
            </div>
          </div>
        </div>
      </section>

      {/* CITIES SECTION */}
      <section id="cities" className="py-24 bg-cream relative">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <IslamicPattern variant="octagon-star-lattice" className="text-emerald-midnight" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <div className="text-gold-antique text-sm font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <IslamicStar className="w-3 h-3 text-gold-antique" />
              Cities We Serve
              <IslamicStar className="w-3 h-3 text-gold-antique" />
            </div>
            <h2 className="font-landing-heading text-4xl md:text-5xl text-emerald-midnight">
              From One City, <span className="text-gold-antique italic">Growing Together</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto space-y-16"
          >
            {COUNTRIES.map((country, countryIndex) => (
              <div key={country.code} className="space-y-6 text-center md:text-left">
                <div className="flex items-center gap-4">
                  <h3 className="font-serif font-bold text-2xl text-emerald-midnight opacity-40 uppercase tracking-[0.2em]">{country.name}</h3>
                  <div className="h-px flex-1 bg-emerald-midnight/10"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {country.cities.map((city, cityIndex) => {
                    const isChennai = city === 'Chennai';
                    return (
                      <CityCard
                        key={city}
                        name={city}
                        status="Live"
                        desc={isChennai ? "50+ Verified Spots" : "Verified Spots"}
                        delay={(countryIndex * 100) + (cityIndex * 50)}
                        onClick={() => onSelectCity(city)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 bg-gradient-to-b from-emerald-midnight to-[#051a14] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 flex justify-center -mt-3 text-gold-lantern/20">
          <IslamicStar className="w-6 h-6 animate-pulse-slow" />
        </div>
        <div className="absolute top-0 w-full opacity-20">
          <IslamicDivider />
        </div>

        <div className="absolute inset-0 opacity-100 pointer-events-none">
          <IslamicPattern variant="geometric" opacity={0.08} className="text-emerald-sacred" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <div className="flex justify-center mb-6 text-gold-lantern/50 animate-float reveal">
            <Heart size={24} />
          </div>

          <h2 className="reveal font-landing-heading text-5xl md:text-6xl text-neutral-pearl mb-6" style={{ transitionDelay: '100ms' }}>
            This Ramadan, <br />
            <span className="italic text-gold-lantern">Let No One Go Hungry</span>
          </h2>

          <p className="reveal text-xl text-neutral-ivory/60 mb-10 leading-relaxed font-light" style={{ transitionDelay: '200ms' }}>
            Whether you're looking for a place to eat, or you know a place others should find — Sehri Finder is for you. Join the movement.
          </p>

          <div className="reveal flex flex-col sm:flex-row justify-center gap-4 mb-16" style={{ transitionDelay: '300ms' }}>
            <button
              onClick={onEnterApp}
              className="btn-gold text-emerald-midnight px-10 py-4 rounded-full font-landing-accent font-bold text-lg shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-transform hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              Open Sehri Finder
            </button>
            <button
              onClick={onOpenSubmit}
              className="bg-emerald-sacred/40 hover:bg-emerald-sacred/60 text-neutral-pearl px-10 py-4 rounded-full font-landing-accent font-bold text-lg border border-white/10 backdrop-blur-md transition-colors hover:border-gold-lantern/30"
            >
              Add a Sehri Spot
            </button>
          </div>

          <div className="reveal max-w-2xl mx-auto border-t border-white/5 pt-12" style={{ transitionDelay: '400ms' }}>
            <p className="font-arabic-text text-2xl mb-4 text-neutral-ivory/80 dir-rtl" lang="ar">
              إِنَّمَا نُطْعِمُكُمْ لِوَجْهِ اللَّهِ لَا نُرِيدُ مِنكُمْ جَزَاءً وَلَا شُكُورًا
            </p>
            <p className="font-landing-heading italic text-lg text-neutral-ivory/50 mb-2">
              "We feed you only for the countenance of Allah. We wish not from you reward or gratitude."
            </p>
            <p className="text-xs uppercase tracking-widest text-gold-antique/60">— Qur'an (76:9)</p>
          </div>
        </div>
      </section>

      {/* HELP US SERVE BETTER SECTION */}
      <section className="py-24 bg-cream relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal">
            <div className="text-gold-antique text-xs font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
              <span>•</span> Community Effort <span>•</span>
            </div>
            <h2 className="font-landing-heading text-4xl md:text-5xl text-emerald-midnight mb-6">
              Help Us <span className="italic text-gold-antique">Serve Better</span>
            </h2>
            <p className="font-landing-body text-neutral-600 max-w-2xl mx-auto leading-relaxed text-lg">
              This directory relies on people like you. Accuracy is our amanah. Help us keep this list updated for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <HelpCard
              delay={0}
              icon={<PlusCircle className="w-7 h-7" />}
              title="Add a Spot"
              desc="Know a Masjid, trust, or restaurant offering Sehri? Submit the details so others can benefit."
              action="Submit Details"
              onClick={onOpenSubmit}
            />
            <HelpCard
              delay={100}
              icon={<CheckCircle className="w-7 h-7" />}
              title="Verify Data"
              desc="Spotted an error? Closed location? Timing change? Let us know immediately to fix it."
              action="Report Issue"
              onClick={() => window.open(`${APP_CONFIG.WHATSAPP_BASE_URL}/${APP_CONFIG.ADMIN_PHONE}?text=${encodeURIComponent('Assalamu Alaikum, I want to report an issue or update details for a Sehri spot.')}`, '_blank')}
            />
            <HelpCard
              delay={200}
              icon={<Users className="w-7 h-7" />}
              title="Join the Team"
              desc="We need city leads, verifiers, and tech volunteers. Be part of the team behind Sehri Finder."
              action="Volunteer"
              onClick={handleVolunteer}
            />
          </div>
        </div>
      </section>

      {/* DISCLAIMER SECTION */}
      <DisclaimerSection />

      {/* FOOTER */}
      <footer className="bg-[#020a08] pt-20 pb-10 border-t border-white/5 relative overflow-hidden font-landing-body text-neutral-400">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <IslamicPattern variant="hexagonal" className="text-white" />
        </div>

        <div className="container mx-auto px-6 relative z-10">

          <div className="text-center mb-20 relative group">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-lantern/20 to-transparent -z-10 group-hover:via-gold-lantern/40 transition-colors"></div>
            <div className="inline-block bg-[#020a08] px-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-sacred/10 border border-gold-lantern/20 flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-shadow animate-float">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500/20" />
                </div>
                <h2 className="font-landing-heading text-4xl md:text-6xl lg:text-7xl text-neutral-pearl tracking-tight">
                  Built with Love for the <span className="text-gold-lantern italic font-serif">Ummah</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 border-b border-white/5 pb-16">
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-2 text-neutral-pearl">
                <Moon className="w-6 h-6 text-gold-lantern fill-current" />
                <span className="font-brand text-2xl font-bold tracking-wide">
                  Sehri<span className="text-gold-lantern">Finder</span>
                </span>
              </div>

              <div className="p-5 rounded-lg bg-emerald-sacred/5 border border-white/5 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gold-lantern/30"></div>
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-gold-lantern/70 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    <strong>Disclaimer:</strong> Listings are community-sourced. Please verify details before visiting. Details may change during Ramadan.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-neutral-pearl font-bold uppercase tracking-widest text-xs relative inline-block">
                Explore
                <span className="absolute bottom-0 left-0 w-1/2 h-px bg-gold-lantern"></span>
              </h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => scrollToSection('story')} className="hover:text-gold-lantern transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-gold-lantern transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('cities')} className="hover:text-gold-lantern transition-colors">Cities</button></li>
                <li><a href="https://www.lighthousementoring.org/" target="_blank" rel="noopener noreferrer" className="text-gold-lantern hover:text-white transition-colors font-bold">Have doubts about Islam?</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-neutral-pearl font-bold uppercase tracking-widest text-xs relative inline-block">
                Contribute
                <span className="absolute bottom-0 left-0 w-1/2 h-px bg-gold-lantern"></span>
              </h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={onOpenSubmit} className="hover:text-gold-lantern transition-colors text-left">Add a Spot</button></li>
                <li><a href={`${APP_CONFIG.WHATSAPP_BASE_URL}/${APP_CONFIG.ADMIN_PHONE}?text=${encodeURIComponent('Assalamu Alaikum, I want to report an issue on Sehri Finder.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-lantern transition-colors">Report Issue</a></li>
                <li><a href="mailto:salam@sehrifinder.com" className="hover:text-gold-lantern transition-colors">Partner with us</a></li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <h4 className="text-neutral-pearl font-bold uppercase tracking-widest text-xs relative inline-block">
                Stay Connected
                <span className="absolute bottom-0 left-0 w-1/2 h-px bg-gold-lantern"></span>
              </h4>
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input
                    type="email"
                    placeholder="salam@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-neutral-300 focus:outline-none focus:border-gold-lantern/50 transition-colors focus:shadow-lg"
                  />
                </div>
                <button
                  onClick={() => toast.info("Newsletter coming soon!", { description: "We are still setting up our newsletter system." })}
                  className="btn-gold text-emerald-midnight px-4 py-3 rounded-lg font-bold text-sm transition-transform hover:scale-105 active:scale-95 w-full">
                  Subscribe for Updates
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
            <div className="flex items-center gap-6">
              <span>&copy; 2026 Sehri Finder. All rights reserved.</span>
              <div className="hidden md:block w-1 h-1 rounded-full bg-white/10"></div>
              <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div >
  );
};
