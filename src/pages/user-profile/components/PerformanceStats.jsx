import React from 'react';
import StatisticsCard from '../../activity-dashboard/components/StatisticsCard';

const PerformanceStats = () => {
  const stats = [
    {
      icon: 'Target',
      title: 'Questions Solved',
      value: '1,247',
      subtitle: 'Across all subjects',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      icon: 'TrendingUp',
      title: 'Average Accuracy',
      value: '87.5%',
      subtitle: 'Last 30 days',
      trend: 'up',
      trendValue: '+5.2%'
    },
    {
      icon: 'Clock',
      title: 'Study Hours',
      value: '156h',
      subtitle: 'This month',
      trend: 'up',
      trendValue: '+8h'
    },
    {
      icon: 'Award',
      title: 'Concept Mastery',
      value: '78%',
      subtitle: '234/300 concepts',
      trend: 'up',
      trendValue: '+3%'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="BarChart3" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Performance Overview
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">
            Your key performance metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

import Icon from '../../../components/AppIcon';

export default PerformanceStats;