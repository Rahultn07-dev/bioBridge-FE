import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticeTimer = ({ isActive, onPause, onResume, onReset }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleReset = () => {
    setSeconds(0);
    onReset();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Timer" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-base text-foreground">
            Practice Timer
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary transition-smooth"
          aria-label="Reset timer"
        >
          <Icon name="RotateCcw" size={16} color="var(--color-muted-foreground)" />
        </button>
      </div>

      <div className="text-center mb-4">
        <p className="text-3xl md:text-4xl font-mono font-semibold text-primary">
          {formatTime(seconds)}
        </p>
      </div>

      <div className="flex gap-2">
        {isActive ? (
          <Button
            variant="outline"
            fullWidth
            onClick={onPause}
            iconName="Pause"
            iconPosition="left"
          >
            Pause
          </Button>
        ) : (
          <Button
            variant="default"
            fullWidth
            onClick={onResume}
            iconName="Play"
            iconPosition="left"
          >
            Resume
          </Button>
        )}
      </div>
    </div>
  );
};

export default PracticeTimer;