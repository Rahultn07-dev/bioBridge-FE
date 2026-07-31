import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementGallery = () => {
  const achievements = [
    {
      id: 1,
      icon: 'Award',
      title: '100 Day Streak',
      description: 'Maintained consistent practice for 100 days',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      earned: true,
      date: '15 Dec 2024',
      rarity: 'Rare'
    },
    {
      id: 2,
      icon: 'Trophy',
      title: 'Top 50 Rank',
      description: 'Achieved top 50 ranking in overall leaderboard',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      earned: true,
      date: '20 Dec 2024',
      rarity: 'Epic'
    },
    {
      id: 3,
      icon: 'Target',
      title: '1000 Questions',
      description: 'Successfully solved 1000 practice questions',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      earned: true,
      date: '10 Dec 2024',
      rarity: 'Common'
    },
    {
      id: 4,
      icon: 'Flame',
      title: '7 Day Streak',
      description: 'Practiced for 7 consecutive days',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      earned: true,
      date: '5 Dec 2024',
      rarity: 'Common'
    },
    {
      id: 5,
      icon: 'Star',
      title: 'Perfect Score',
      description: 'Achieved 100% accuracy in a practice session',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      earned: true,
      date: '18 Dec 2024',
      rarity: 'Rare'
    },
    {
      id: 6,
      icon: 'BookOpen',
      title: 'Subject Master',
      description: 'Achieved 90% mastery in a subject',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      earned: true,
      date: '22 Dec 2024',
      rarity: 'Epic'
    }
  ];

  const milestones = [
    { rank: 42, date: '29 Dec 2024', change: '+5' },
    { rank: 47, date: '22 Dec 2024', change: '+3' },
    { rank: 50, date: '15 Dec 2024', change: '+8' },
    { rank: 58, date: '8 Dec 2024', change: '-2' },
    { rank: 56, date: '1 Dec 2024', change: '+12' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Epic':
        return 'text-purple-400';
      case 'Rare':
        return 'text-blue-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Medal" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Earned Achievements
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              {achievements?.filter(a => a?.earned)?.length} of {achievements?.length} unlocked
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className="border border-primary/30 bg-primary/5 rounded-lg p-4 hover:border-primary/50 transition-smooth"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-lg ${achievement?.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={achievement?.icon} size={24} className={achievement?.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm md:text-base font-caption font-semibold text-foreground">
                      {achievement?.title}
                    </h3>
                    <span className={`text-xs font-caption font-medium ${getRarityColor(achievement?.rarity)}`}>
                      {achievement?.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-caption">
                    {achievement?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <Icon name="CheckCircle2" size={14} className="text-success" />
                <span className="text-xs font-caption text-success font-medium">
                  Earned on {achievement?.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Ranking History
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground font-caption">
              Your progress over time
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {milestones?.map((milestone, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-caption font-bold text-primary">#{milestone?.rank}</span>
                </div>
                <div>
                  <p className="text-sm font-caption font-medium text-foreground">Rank {milestone?.rank}</p>
                  <p className="text-xs text-muted-foreground font-caption">{milestone?.date}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${
                milestone?.change?.startsWith('+') ? 'text-success' : 'text-error'
              }`}>
                <Icon name={milestone?.change?.startsWith('+') ? 'ArrowUp' : 'ArrowDown'} size={16} />
                <span className="text-sm font-caption font-medium">{milestone?.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementGallery;