import React from 'react';
import Icon from '../AppIcon';

const MobileNavToggle = ({ isOpen = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 lg:hidden w-11 h-11 flex items-center justify-center bg-card border border-border rounded-md transition-smooth hover:bg-secondary active:scale-97 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
    >
      <Icon 
        name={isOpen ? 'X' : 'Menu'} 
        size={20} 
        color="var(--color-foreground)" 
      />
    </button>
  );
};

export default MobileNavToggle;