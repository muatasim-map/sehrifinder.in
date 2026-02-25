import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Share2, Info, Flag, PlusCircle, Globe, BookOpen } from 'lucide-react';
import { Logo } from './Logo';
import { IslamicPattern } from './Pattern';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenSubmit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSubmit }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t, dir } = useLanguage();

  const toggleLanguage = () => {
    const nextLang: Record<string, 'en' | 'ta' | 'ur'> = {
      'en': 'ta',
      'ta': 'ur',
      'ur': 'en'
    };
    setLanguage(nextLang[language]);
  };

  const getLangLabel = () => {
    if (language === 'en') return 'EN';
    if (language === 'ta') return 'TA';
    return 'UR';
  };

  return (
    <>
      <header
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        dir="ltr"
      >
        {/* Frosted glass background — always present, opacity tied to a class */}
        <div className="absolute inset-0 bg-emerald-midnight/80 backdrop-blur-xl border-b border-gold-lantern/10 shadow-[0_2px_20px_rgba(0,0,0,0.4)]" />
        <div className={`container mx-auto px-4 h-16 flex items-center justify-between relative z-10 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <Logo variant="light" />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Learn Quranic Arabic Link */}
            <a
              href="https://dev.quranlingo.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20 transition-all text-xs font-bold whitespace-nowrap"
            >
              <BookOpen size={13} />
              <span>Learn Quranic Arabic</span>
            </a>

            {/* Doubts Link */}
            <a
              href="https://www.lighthousementoring.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-bright/20 bg-gold-bright/10 text-gold-bright hover:bg-gold-bright/20 transition-all text-xs font-bold whitespace-nowrap"
            >
              <span>Have doubts about Islam?</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/8 text-white hover:bg-white/15 transition-all text-xs font-bold"
            >
              <Globe size={14} className="text-gold-bright" />
              <span>{getLangLabel()}</span>
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open Menu"
              className="p-2 text-gold-bright hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end" dir={dir}>
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className={`relative w-72 bg-cream h-full shadow-2xl p-6 flex flex-col ${language === 'ur' ? 'text-right' : 'text-left'}`}>
            <button
              onClick={() => setMenuOpen(false)}
              className={`absolute top-4 p-2 text-primary hover:bg-gray-100 rounded-full ${dir === 'rtl' ? 'left-4' : 'right-4'}`}
            >
              <X className="w-6 h-6" />
            </button>

            <div className={`flex flex-col ${language === 'ur' ? 'items-end' : 'items-start'}`}>
              <div className={`font-brand text-2xl mb-1 ${language === 'ur' ? 'font-urdu' : ''}`}>
                Sehri <span className="text-gold-lantern">Finder</span>
              </div>
              <p className="text-sm text-muted-foreground italic font-serif">Connecting the community</p>
            </div>

            <nav className="flex-1 space-y-2">
              <button
                onClick={() => { setMenuOpen(false); onOpenSubmit?.(); }}
                className={`flex items-center gap-4 w-full p-3 rounded-lg text-primary hover:bg-gray-100 transition-colors font-medium ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
              >
                <PlusCircle size={20} />
                <span>{t('submitSpot')}</span>
              </button>

              <a
                href="https://www.lighthousementoring.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex sm:hidden items-center gap-4 w-full p-3 rounded-lg text-gold-bright hover:bg-gray-100 transition-colors font-bold ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <Globe size={20} />
                <span>Have doubts about Islam?</span>
              </a>

              <a
                href="https://dev.quranlingo.in/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex md:hidden items-center gap-4 w-full p-3 rounded-lg text-emerald-600 hover:bg-gray-100 transition-colors font-bold ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}
              >
                <BookOpen size={20} />
                <span>Learn Quranic Arabic</span>
              </a>

              <MenuItem icon={<Info size={20} />} label="About This Service" dir={dir} />
              <MenuItem icon={<Flag size={20} />} label={t('reportIssue')} dir={dir} />
              <MenuItem icon={<Share2 size={20} />} label={t('shareApp')} dir={dir} />
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200">
              <p className="text-xs text-center text-gray-500">
                {t('copyright')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const MenuItem = ({ icon, label, dir }: { icon: React.ReactNode, label: string, dir?: string }) => (
  <button className={`flex items-center gap-4 w-full p-3 rounded-lg text-primary hover:bg-gray-100 transition-colors font-medium ${dir === 'rtl' ? 'flex-row-reverse text-right' : 'text-left'}`}>
    {icon}
    <span>{label}</span>
  </button>
);
