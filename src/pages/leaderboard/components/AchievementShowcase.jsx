import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementShowcase = () => {
  const achievements = [
    {
      id: 1,
      icon: 'Award',
      title: '100 Day Streak',
      description: 'Maintained consistent practice for 100 days',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      earned: true,
      date: '15 Dec 2024'
    },
    {
      id: 2,
      icon: 'Trophy',
      title: 'Top 50 Rank',
      description: 'Achieved top 50 ranking in overall leaderboard',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      earned: true,
      date: '20 Dec 2024'
    },
    {
      id: 3,
      icon: 'Target',
      title: '1000 Questions',
      description: 'Successfully solved 1000 practice questions',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      earned: true,
      date: '10 Dec 2024'
    },
    {
      id: 4,
      icon: 'Zap',
      title: 'Speed Master',
      description: 'Solved 50 questions in under 30 minutes',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      earned: false,
      progress: 65
    },
    {
      id: 5,
      icon: 'Star',
      title: 'Perfect Score',
      description: 'Achieved 100% accuracy in a practice session',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      earned: false,
      progress: 85
    },
    {
      id: 6,
      icon: 'Crown',
      title: 'Top 10 Legend',
      description: 'Reach top 10 in overall rankings',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      earned: false,
      progress: 42
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Medal" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Achievement Gallery
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">
            Your earned badges and milestones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`border rounded-lg p-4 transition-smooth ${
              achievement?.earned
                ? 'border-primary/30 bg-primary/5 hover:border-primary/50' :'border-border bg-card hover:border-border/80 opacity-75'
            }`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-12 h-12 rounded-lg ${achievement?.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={achievement?.icon} size={24} className={achievement?.color} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm md:text-base font-caption font-semibold text-foreground mb-1">
                  {achievement?.title}
                </h3>
                <p className="text-xs text-muted-foreground font-caption">
                  {achievement?.description}
                </p>
              </div>
            </div>

            {achievement?.earned ? (
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle2" size={16} className="text-success" />
                <span className="text-xs font-caption text-success font-medium">
                  Earned on {achievement?.date}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-caption text-muted-foreground">Progress</span>
                  <span className="text-xs font-caption font-medium text-foreground">
                    {achievement?.progress}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-smooth"
                    style={{ width: `${achievement?.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementShowcase;