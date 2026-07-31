import React from 'react';
import Icon from '../../../components/AppIcon';

const DoubtStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Doubts',
      value: stats?.total,
      icon: 'MessageCircleQuestion',
      color: 'text-primary bg-primary/10'
    },
    {
      label: 'Pending',
      value: stats?.pending,
      icon: 'Clock',
      color: 'text-warning bg-warning/10'
    },
    {
      label: 'Answered',
      value: stats?.answered,
      icon: 'CheckCircle2',
      color: 'text-success bg-success/10'
    },
    {
      label: 'Resolved',
      value: stats?.resolved,
      icon: 'CheckCheck',
      color: 'text-primary bg-primary/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 hover:border-primary/30 transition-smooth"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${stat?.color} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} />
            </div>
          </div>
          <div className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-1">
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

export default DoubtStats;