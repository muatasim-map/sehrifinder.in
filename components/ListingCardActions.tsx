import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Share2, Flag, Phone, Navigation, X, MessageCircle } from 'lucide-react';
import { SehriSpot } from '../types';
import { APP_CONFIG } from '../config';
import { useLanguage } from '../context/LanguageContext';
import { isMobileNumber } from '../utils/phone';

interface ListingCardActionsProps {
  data: SehriSpot;
}

/**
 * Displays the action buttons: Contact (Modal), Directions, Share, and Report.
 * High ROI Feature:
 * - Contact button now opens a modal with "WhatsApp" (Primary) and "Call" (Secondary) options.
 */
export const ListingCardActions: React.FC<ListingCardActionsProps> = ({ data }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsContactModalOpen(true);
  };

  const confirmReport = () => {
    const message = APP_CONFIG.MESSAGES.REPORT_TEMPLATE(data.name, data.area);
    window.open(`${APP_CONFIG.WHATSAPP_BASE_URL}/${APP_CONFIG.ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    setIsReportModalOpen(false);
  };

  const handleShareClick = () => {
    const message = APP_CONFIG.MESSAGES.SHARE_TEMPLATE(data.name, data.area, data.timing);
    if (navigator.share) {
      navigator.share({
        title: `Sehri @ ${data.name}`,
        text: message,
        url: 'https://sehrifinder.com'
      }).catch(console.error);
    } else {
      window.open(`${APP_CONFIG.WHATSAPP_BASE_URL}/?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleDirectionsClick = () => {
    if (data.latitude && data.longitude) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`, '_blank');
    } else {
      const query = data.address || `${data.name}, ${data.area}, ${data.city}`;
      window.open(`${APP_CONFIG.MAPS_BASE_URL}${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleWhatsAppChat = () => {
    if (data.phones && data.phones.length > 0) {
      // Clean phone number (remove spaces, dashes)
      const phone = data.phones[0].replace(/\s+/g, '').replace(/-/g, '');
      const message = APP_CONFIG.MESSAGES.BOOKING_TEMPLATE(data.name, data.area);
      window.open(`${APP_CONFIG.WHATSAPP_BASE_URL}/${phone}?text=${encodeURIComponent(message)}`, '_blank');
      setIsContactModalOpen(false);
    }
  };

  const handleCall = () => {
    if (data.phones && data.phones.length > 0) {
      window.location.href = `tel:${data.phones[0]}`;
      setIsContactModalOpen(false);
    }
  };

  const hasPhone = data.phones && data.phones.length > 0;

  return (
    <div className="flex flex-col gap-4 relative z-10 pt-2 mt-auto">

      {/* Primary High-ROI Actions */}
      <div className="flex gap-2 h-10">
        {hasPhone ? (
          <>
            {/* Contact Button */}
            <button
              onClick={handleContactClick}
              className="px-4 flex items-center justify-center gap-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-200 font-bold text-sm"
              title="Contact Venue"
            >
              <Phone size={18} className="text-gray-600" />
            </button>

            {/* Map Button - Dark Green/Primary - Full Width Dominance */}
            <button
              onClick={handleDirectionsClick}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#1a4d2e] text-white hover:bg-[#143d24] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-primary/20 font-bold text-sm tracking-wide"
              title="Get Directions"
            >
              <Navigation size={18} className="text-white" />
              <span>Get Directions</span>
            </button>
          </>
        ) : (
          <button
            onClick={handleDirectionsClick}
            className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-[#1a4d2e] text-white hover:bg-[#143d24] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-primary/20 font-bold text-sm tracking-wide"
          >
            <Navigation size={18} />
            <span>Get Directions</span>
          </button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between px-1 border-t border-gray-100 pt-3">
        <button
          onClick={handleShareClick}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gold-antique transition-colors group"
        >
          <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-gold/10 transition-colors">
            <Share2 size={14} className="group-hover:text-gold-antique" />
          </div>
          {t('share')}
        </button>

        <button
          onClick={handleReportClick}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors group"
        >
          <div className="p-1.5 rounded-full bg-gray-100 group-hover:bg-red-50 transition-colors">
            <Flag size={14} className="group-hover:text-red-500" />
          </div>
          {t('reportIssue')}
        </button>
      </div>

      {/* Contact Modal Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isContactModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                onClick={() => setIsContactModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gold/20"
              >
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                    <Phone className="text-emerald-600 fill-emerald-600/10" size={24} />
                  </div>

                  <h3 className="font-brand text-xl font-bold text-emerald-midnight mb-2">{t('contactModalTitle')}</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium">
                    {data.name}
                  </p>

                  <div className="flex flex-col gap-3 w-full">
                    {/* WhatsApp Option (Primary) - Only show if mobile */}
                    {data.phones && data.phones.length > 0 && isMobileNumber(data.phones[0]) && (
                      <button
                        onClick={handleWhatsAppChat}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-[#25D366] text-white font-bold text-base hover:bg-[#20bd5a] shadow-lg shadow-emerald-500/20 transition-all transform active:scale-95"
                      >
                        <MessageCircle size={20} fill="currentColor" className="text-white" />
                        {t('chatWhatsApp')}
                      </button>
                    )}

                    {/* Call Option (Secondary) */}
                    <button
                      onClick={handleCall}
                      className={`w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-100 text-gray-700 font-bold text-base hover:bg-gray-50 hover:border-gray-200 transition-colors ${data.phones && data.phones.length > 0 && !isMobileNumber(data.phones[0]) ? 'bg-primary text-white border-primary hover:bg-primary-dark' : ''
                        }`}
                    >
                      <Phone size={20} />
                      {t('callNow')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Report Modal Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isReportModalOpen && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
                onClick={() => setIsReportModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-gold/20"
              >
                <button
                  onClick={() => setIsReportModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
                    <Flag className="text-red-500 fill-red-500/20" size={24} />
                  </div>

                  <h3 className="font-brand text-xl font-bold text-emerald-midnight mb-2">{t('reportIssue')}</h3>
                  <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed">
                    You are about to report an issue for <span className="font-bold text-gray-800">{data.name}</span>. This will open WhatsApp to contact our admin.
                  </p>

                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => setIsReportModalOpen(false)}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      onClick={confirmReport}
                      className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all transform active:scale-95"
                    >
                      {t('confirm')}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};