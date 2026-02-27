import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SehriSpot } from '../types';
import { IslamicPattern } from './Pattern';
import { toSlug } from '../utils/slug';

// Import sub-components
import { ListingCardHeader } from './ListingCardHeader';
import { ListingCardDetails } from './ListingCardDetails';
import { ListingCardActions } from './ListingCardActions';

interface ListingCardProps {
  data: SehriSpot;
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
}

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
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on interactive elements like buttons/links inside the card
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) {
      return;
    }
    navigate(`/spot/${data.id}-${toSlug(data.name)}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        transition: 'all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className={`
        relative group overflow-hidden h-full flex flex-col
        bg-gradient-to-b from-white to-[#fffdf5] 
        rounded-3xl p-4 border-2 border-gold/60
        shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1),0_0_15px_-5px_rgba(212,175,55,0.2)] 
        cursor-pointer
        hover:-translate-y-1 hover:scale-[1.01] hover:border-[#D4AF37] hover:shadow-[0_15px_40px_-10px_rgba(212,175,55,0.3),0_0_25px_0px_rgba(255,215,0,0.2)]
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
    </div>
  );
};
