import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const LeaderboardSection = () => {
  const [selectedContest, setSelectedContest] = useState('all-time');

  const leaderboardData = [
  {
    rank: 1,
    name: 'Arjun Sharma',
    score: 98.5,
    percentile: 99.9,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ece17484-1763301747443.png",
    avatarAlt: 'Profile photo of top-ranked student Arjun Sharma with achievement badge',
    badge: 'gold'
  },
  {
    rank: 2,
    name: 'Priya Patel',
    score: 97.2,
    percentile: 99.7,
    avatar: "https://images.unsplash.com/photo-1680506712749-f099c674a806",
    avatarAlt: 'Profile photo of second-ranked student Priya Patel with silver achievement badge',
    badge: 'silver'
  },
  {
    rank: 3,
    name: 'Rahul Verma',
    score: 96.8,
    percentile: 99.5,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_141f27d40-1763294845306.png",
    avatarAlt: 'Profile photo of third-ranked student Rahul Verma with bronze achievement badge',
    badge: 'bronze'
  },
  {
    rank: 4,
    name: 'Sneha Reddy',
    score: 95.4,
    percentile: 99.2,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1478db155-1763296755656.png",
    avatarAlt: 'Profile photo of fourth-ranked student Sneha Reddy',
    badge: null
  },
  {
    rank: 5,
    name: 'Karthik Iyer',
    score: 94.9,
    percentile: 99.0,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ece17484-1763301747443.png",
    avatarAlt: 'Profile photo of fifth-ranked student Karthik Iyer',
    badge: null
  }];


  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold':
        return 'text-yellow-400';
      case 'silver':
        return 'text-gray-400';
      case 'bronze':
        return 'text-orange-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Award" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Top Performers
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              All-time leaderboard rankings
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Rank
              </th>
              <th className="text-left py-3 px-2 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Student
              </th>
              <th className="text-right py-3 px-2 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Score
              </th>
              <th className="text-right py-3 px-2 text-xs md:text-sm font-caption font-medium text-muted-foreground">
                Percentile
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.map((entry) =>
            <tr key={entry?.rank} className="border-b border-border last:border-0 hover:bg-secondary transition-smooth">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-caption font-semibold text-foreground">
                      #{entry?.rank}
                    </span>
                    {entry?.badge &&
                  <Icon name="Award" size={16} className={getBadgeColor(entry?.badge)} />
                  }
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                      src={entry?.avatar}
                      alt={entry?.avatarAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <span className="text-sm md:text-base font-caption font-medium text-foreground">
                      {entry?.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="text-sm md:text-base font-caption font-semibold text-foreground">
                    {entry?.score}%
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <span className="px-2 py-1 rounded text-xs font-caption font-medium bg-primary/10 text-primary">
                    {entry?.percentile}%
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

};

export default LeaderboardSection;