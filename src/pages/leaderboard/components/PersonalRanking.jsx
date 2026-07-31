import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalRanking = () => {
  const personalData = {
    rank: 42,
    name: 'You',
    score: 92.3,
    percentile: 97.8,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa7c17c0-1764679076096.png",
    avatarAlt: 'Your profile photo showing current leaderboard ranking',
    improvement: '+5',
    nextRank: 41,
    pointsNeeded: 2.1
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/30 rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Your Current Ranking
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground font-caption">
            Keep pushing to reach the top!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={personalData?.avatar}
                alt={personalData?.avatarAlt}
                className="w-full h-full object-cover" />

            </div>
            <div>
              <p className="text-xs text-muted-foreground font-caption">Current Rank</p>
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
                #{personalData?.rank}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-success">
            <Icon name="ArrowUp" size={14} />
            <span className="text-xs font-caption font-medium">{personalData?.improvement} from last week</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground font-caption mb-1">Overall Score</p>
          <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            {personalData?.score}%
          </p>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-smooth"
              style={{ width: `${personalData?.score}%` }} />

          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground font-caption mb-1">Percentile</p>
          <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            {personalData?.percentile}%
          </p>
          <p className="text-xs text-muted-foreground font-caption">
            Better than {personalData?.percentile}% of students
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground font-caption mb-1">Next Milestone</p>
          <p className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Rank #{personalData?.nextRank}
          </p>
          <p className="text-xs text-muted-foreground font-caption">
            {personalData?.pointsNeeded}% points needed
          </p>
        </div>
      </div>
    </div>);

};

export default PersonalRanking;