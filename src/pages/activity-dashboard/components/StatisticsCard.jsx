import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCard = ({ icon, title, value, subtitle, trend, trendValue }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 transition-smooth hover:border-primary/50 hover:shadow-lg">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-xs md:text-sm font-caption font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      <div className="space-y-1 md:space-y-2">
        <h3 className="text-xs md:text-sm font-caption text-muted-foreground">{title}</h3>
        <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs md:text-sm font-caption text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;