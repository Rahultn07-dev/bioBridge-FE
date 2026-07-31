import React from 'react';
import Icon from '../../../components/AppIcon';

const ContestStats = ({ stats }) => {
  const statCards = [
    {
      icon: 'Trophy',
      title: 'Total Contests',
      value: stats?.total,
      color: 'primary'
    },
    {
      icon: 'Clock',
      title: 'Upcoming',
      value: stats?.upcoming,
      color: 'warning'
    },
    {
      icon: 'Radio',
      title: 'Live Now',
      value: stats?.live,
      color: 'error'
    },
    {
      icon: 'CheckCircle2',
      title: 'Completed',
      value: stats?.completed,
      color: 'success'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 md:p-6 transition-smooth hover:border-primary/50 hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-${stat?.color}/10 flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color={`var(--color-${stat?.color})`} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-caption text-muted-foreground">{stat?.title}</p>
            <p className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
              {stat?.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContestStats;