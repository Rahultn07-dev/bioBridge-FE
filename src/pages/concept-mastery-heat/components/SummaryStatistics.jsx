import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryStatistics = ({ statistics }) => {
  const statCards = [
    {
      label: 'Overall Mastery',
      value: `${statistics?.overallMastery}%`,
      icon: 'TrendingUp',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      label: 'Strong Concepts',
      value: statistics?.strongConcepts,
      icon: 'CheckCircle2',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10'
    },
    {
      label: 'Moderate Concepts',
      value: statistics?.moderateConcepts,
      icon: 'AlertCircle',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Weak Concepts',
      value: statistics?.weakConcepts,
      icon: 'XCircle',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {statCards?.map((stat) => (
        <div
          key={stat?.label}
          className="bg-card border border-border rounded-lg p-4 md:p-5 transition-smooth hover:elevation-2"
        >
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center mb-3`}>
            <Icon name={stat?.icon} size={20} color={stat?.color?.replace('text-', 'var(--color-')} />
          </div>
          <div className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-1">
            {stat?.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground font-caption">
            {stat?.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryStatistics;