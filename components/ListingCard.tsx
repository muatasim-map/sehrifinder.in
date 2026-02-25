import React from 'react';
import { motion } from 'framer-motion';
import { SehriSpot } from '../types';
import { IslamicPattern } from './Pattern';

// Import sub-components
import { ListingCardHeader } from './ListingCardHeader';
import { ListingCardDetails } from './ListingCardDetails';
import { ListingCardActions } from './ListingCardActions';

interface ListingCardProps {
  data: SehriSpot;
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
}

const HOVER_ANIMATION = {
  y: -4,
  scale: 1.01,
  borderColor: "#D4AF37", // gold-bright
  boxShadow: "0 15px 40px -10px rgba(212,175,55,0.3), 0 0 25px 0px rgba(255,215,0,0.2)"
};

const SPRING_TRANSITION = { type: "spring", stiffness: 300, damping: 20 } as const;

/**
 * The main Card container.
 * 
 * It handles the outer shell (animations, border colors, background pattern)
 * and composes the Header, Details, and Actions sub-components.
 */
export const ListingCard: React.FC<ListingCardProps> = ({
  data,
  isSaved = false,
  onToggleSave
}) => {
  const isFree = data.foodType === 'Free';

  return (
    <motion.div
      whileHover={HOVER_ANIMATION}
      transition={SPRING_TRANSITION}
      className={`
        relative group overflow-hidden h-full flex flex-col
        bg-gradient-to-b from-white to-[#fffdf5] 
        rounded-3xl p-4 border-2 border-gold/60
        shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_0_15px_-5px_rgba(212,175,55,0.2)] 
        cursor-pointer
      `}>

      {/* Background Pattern - Four-Fold Octagon & Star Grid - Reduced Opacity */}
      <IslamicPattern opacity={0.15} variant="octagon-star-lattice" className="text-gold" />

      {/* Decorative top border */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${isFree ? 'bg-primary' : 'bg-gold'} z-10`} />

      {/* Content Wrapper */}
      <div className="flex-1 relative z-10 flex flex-col">

        <ListingCardHeader
          name={data.name}
          verified={data.verified}
          foodType={data.foodType}
          lastVerified={data.lastVerified}
          isFree={isFree}
          isSaved={isSaved}
          timing={data.timing}
          onToggleSave={() => onToggleSave && onToggleSave(data.id)}
        />

        <div className="mt-2 flex-1">
          <ListingCardDetails {...data} />
        </div>

        {/* Action Footer */}
        <ListingCardActions data={data} />
      </div>
    </motion.div>
  );
};
