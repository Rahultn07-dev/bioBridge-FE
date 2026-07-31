import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const MobileChapterAccordion = ({ chapter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const getMasteryColor = (percentage) => {
    if (percentage >= 67) return 'bg-emerald-500';
    if (percentage >= 34) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleConceptClick = (concept) => {
    if (concept?.masteryPercentage < 34) {
      navigate('/practice-lab', {
        state: {
          prefilter: {
            chapter: chapter?.name,
            concept: concept?.name,
            masteryLevel: 'weak'
          }
        }
      });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left transition-smooth hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        aria-expanded={isExpanded}
      >
        <span className="font-heading font-semibold text-sm text-foreground">
          {chapter?.name}
        </span>
        <Icon
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size={20}
          color="var(--color-muted-foreground)"
        />
      </button>
      {isExpanded && (
        <div className="p-4 pt-0 space-y-2">
          {chapter?.concepts?.map((concept) => (
            <button
              key={concept?.id}
              onClick={() => handleConceptClick(concept)}
              className="w-full bg-secondary border border-border rounded-lg p-3 text-left transition-smooth hover:elevation-1 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-caption font-medium text-sm text-foreground">
                  {concept?.name}
                </span>
                <div className={`w-8 h-8 ${getMasteryColor(concept?.masteryPercentage)} rounded flex-shrink-0`} />
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Mastery: </span>
                  <span className="font-mono font-medium text-foreground">{concept?.masteryPercentage}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Questions: </span>
                  <span className="font-mono font-medium text-foreground">{concept?.questionsAttempted}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Accuracy: </span>
                  <span className="font-mono font-medium text-foreground">{concept?.accuracy}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Time: </span>
                  <span className="font-mono font-medium text-foreground">{concept?.timeSpent}</span>
                </div>
              </div>
              {concept?.masteryPercentage < 34 && (
                <div className="mt-2 text-xs text-emerald-500 font-caption">
                  Tap to practice this topic
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileChapterAccordion;