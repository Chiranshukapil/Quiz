import React, { useEffect } from 'react';
import { getTrophyFilter } from './Badgehelper';

const BadgeNotification = ({ badge, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);
  
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg border-l-4 border-purple-500 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gray-100">
            <img 
              src="/trophy.png" 
              alt="Trophy"
              className={`w-8 h-8 ${getTrophyFilter(badge.id)}`}
            />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">New Badge Unlocked!</h3>
            <p className="text-gray-600">{badge.name}</p>
            <p className="text-sm text-gray-500">{badge.description}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default BadgeNotification;
