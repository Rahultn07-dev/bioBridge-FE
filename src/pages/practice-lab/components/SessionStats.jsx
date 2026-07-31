import React from 'react';
import Icon from '../../../components/AppIcon';

const SessionStats = ({ stats }) => {
  const accuracyPercentage = stats?.totalAttempted > 0 
    ? Math.round((stats?.correctAnswers / stats?.totalAttempted) * 100) 
    : 0;

  const avgTimePerQuestion = stats?.totalAttempted > 0
    ? Math.round(stats?.totalTime / stats?.totalAttempted)
    : 0;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const statCards = [
    {
      icon: 'Target',
      label: 'Accuracy',
      value: `${accuracyPercentage}%`,
      color: accuracyPercentage >= 70 ? 'text-success' : accuracyPercentage >= 50 ? 'text-warning' : 'text-error',
      bgColor: accuracyPercentage >= 70 ? 'bg-success/10' : accuracyPercentage >= 50 ? 'bg-warning/10' : 'bg-error/10'
    },
    {
      icon: 'Clock',
      label: 'Avg Time/Q',
      value: formatTime(avgTimePerQuestion),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'CheckCircle2',
      label: 'Correct',
      value: stats?.correctAnswers,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'XCircle',
      label: 'Incorrect',
      value: stats?.incorrectAnswers,
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        <h3 className="font-heading font-semibold text-base text-foreground">
          Session Statistics
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {statCards?.map((stat) => (
          <div
            key={stat?.label}
            className={`p-3 rounded-lg border border-border ${stat?.bgColor}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={stat?.icon} size={16} color={`var(--color-${stat?.color?.replace('text-', '')})`} />
              <span className="text-xs font-caption text-muted-foreground">
                {stat?.label}
              </span>
            </div>
            <p className={`text-xl md:text-2xl font-heading font-semibold ${stat?.color}`}>
              {stat?.value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm font-caption">
          <span className="text-muted-foreground">Total Time</span>
          <span className="text-foreground font-medium">{formatTime(stats?.totalTime)}</span>
        </div>
        <div className="flex items-center justify-between text-sm font-caption mt-2">
          <span className="text-muted-foreground">Questions Attempted</span>
          <span className="text-foreground font-medium">{stats?.totalAttempted}</span>
        </div>
      </div>
    </div>
  );
};

export default SessionStats;