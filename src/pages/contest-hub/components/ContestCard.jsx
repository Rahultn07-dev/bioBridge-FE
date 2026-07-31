import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContestCard = ({ contest }) => {
  const navigate = useNavigate();
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success bg-success/10 border-success/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'hard':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'physics':
        return 'bg-blue-400/10 text-blue-400';
      case 'chemistry':
        return 'bg-purple-400/10 text-purple-400';
      case 'biology':
        return 'bg-green-400/10 text-green-400';
      case 'mathematics':
        return 'bg-orange-400/10 text-orange-400';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const start = new Date(contest?.startDate);
    const diff = start - now;

    if (diff < 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const isLive = contest?.status === 'live';
  const timeRemaining = getTimeRemaining();

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {contest?.isPremium && (
              <span className="px-2 py-1 rounded text-xs font-caption font-medium bg-primary/10 text-primary border border-primary/20">
                Premium
              </span>
            )}
            {isLive && (
              <span className="px-2 py-1 rounded text-xs font-caption font-medium bg-error/10 text-error border border-error/20 flex items-center gap-1 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                LIVE
              </span>
            )}
            <span className={`px-2 py-1 rounded text-xs font-caption font-medium border ${getDifficultyColor(contest?.difficulty)}`}>
              {contest?.difficulty?.charAt(0)?.toUpperCase() + contest?.difficulty?.slice(1)}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-2">
            {contest?.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
            {contest?.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {contest?.subjects?.map((subject) => (
          <span
            key={subject}
            className={`px-2 py-1 rounded text-xs font-caption font-medium ${getSubjectColor(subject)}`}
          >
            {subject?.charAt(0)?.toUpperCase() + subject?.slice(1)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <div>
            <p className="text-xs text-muted-foreground">Duration</p>
            <p className="text-sm font-caption font-medium text-foreground">{contest?.duration} min</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="FileQuestion" size={16} color="var(--color-muted-foreground)" />
          <div>
            <p className="text-xs text-muted-foreground">Questions</p>
            <p className="text-sm font-caption font-medium text-foreground">{contest?.totalQuestions}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
          <div>
            <p className="text-xs text-muted-foreground">Participants</p>
            <p className="text-sm font-caption font-medium text-foreground">{contest?.participants?.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Award" size={16} color="var(--color-muted-foreground)" />
          <div>
            <p className="text-xs text-muted-foreground">Max Marks</p>
            <p className="text-sm font-caption font-medium text-foreground">{contest?.maxMarks}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {!isLive && (
          <div className="flex items-center justify-between text-xs md:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>Starts: {formatDate(contest?.startDate)} at {formatTime(contest?.startDate)}</span>
            </div>
            {timeRemaining && (
              <span className="px-2 py-1 rounded bg-primary/10 text-primary font-caption font-medium">
                {timeRemaining}
              </span>
            )}
          </div>
        )}

        <Button
          variant={isLive ? 'default' : 'outline'}
          fullWidth
          iconName={isLive ? 'Play' : 'UserPlus'}
          iconPosition="right"
          className={isLive ? 'animate-pulse' : ''}
          onClick={() => navigate(`/contests/${contest?.id}/take`)}
        >
          {isLive ? 'Join Now' : 'Register & Take Test'}
        </Button>
      </div>
    </div>
  );
};

export default ContestCard;