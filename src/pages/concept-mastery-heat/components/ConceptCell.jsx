import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConceptCell = ({ concept, chapterName }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const getMasteryColor = (percentage) => {
    if (percentage >= 67) return 'bg-emerald-500 hover:bg-emerald-600';
    if (percentage >= 34) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-red-500 hover:bg-red-600';
  };

  const handleClick = () => {
    if (concept?.masteryPercentage < 34) {
      navigate('/practice-lab', {
        state: {
          prefilter: {
            chapter: chapterName,
            concept: concept?.name,
            masteryLevel: 'weak'
          }
        }
      });
    }
  };

  return (
    <div className="relative">
      <button
        className={`w-full aspect-square ${getMasteryColor(concept?.masteryPercentage)} rounded transition-smooth cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${concept?.masteryPercentage < 34 ? 'animate-pulse' : ''}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleClick}
        aria-label={`${concept?.name}: ${concept?.masteryPercentage}% mastery`}
      />
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border p-3 animate-fade-in pointer-events-none">
          <div className="font-caption font-semibold text-sm mb-2 text-foreground">
            {concept?.name}
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mastery:</span>
              <span className="font-mono font-medium text-foreground">{concept?.masteryPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Questions:</span>
              <span className="font-mono font-medium text-foreground">{concept?.questionsAttempted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Accuracy:</span>
              <span className="font-mono font-medium text-foreground">{concept?.accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Spent:</span>
              <span className="font-mono font-medium text-foreground">{concept?.timeSpent}</span>
            </div>
          </div>
          {concept?.masteryPercentage < 34 && (
            <div className="mt-2 pt-2 border-t border-border text-xs text-emerald-500 font-caption">
              Click to practice this topic
            </div>
          )}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-popover" />
        </div>
      )}
    </div>
  );
};

export default ConceptCell;