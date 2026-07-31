import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({
  label,
  path,
  icon,
  tooltip,
  isActive = false,
  isCollapsed = false,
  onClick
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative">
      <Link
        to={path}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          flex items-center gap-3 px-4 py-3 rounded-md transition-smooth
          ${isActive 
            ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:bg-secondary hover:text-foreground border border-transparent'
          }
          ${isCollapsed ? 'justify-center' : ''}
          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
        `}
        aria-label={label}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon 
          name={icon} 
          size={20} 
          color={isActive ? 'var(--color-primary)' : 'currentColor'} 
        />
        {!isCollapsed && (
          <span className="font-caption font-medium">{label}</span>
        )}
      </Link>

      {showTooltip && isCollapsed && (
        <div
          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 px-3 py-2 bg-popover text-popover-foreground text-sm font-caption rounded-md shadow-lg border border-border whitespace-nowrap animate-fade-in pointer-events-none"
          role="tooltip"
        >
          {tooltip || label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
        </div>
      )}
    </div>
  );
};

export default NavigationItem;