export const getTrophyFilter = (id) => {
    switch(id) {
      case 1: // Purple
        return 'hue-rotate-240 saturate-150 brightness-90'; 
      case 2: // Blue
        return 'hue-rotate-180 saturate-125 brightness-95';
      case 3: // Green
        return 'hue-rotate-70 saturate-200 brightness-100';
      case 4: return 'grayscale-0'; // Original gold
      default: return 'grayscale';
    }
  };