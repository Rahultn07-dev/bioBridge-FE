import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RankingTable = ({ activeTab, selectedPeriod, selectedExam, selectedSubject }) => {
  const generateRankingData = () => {
    const names = [
      'Arjun Sharma', 'Priya Patel', 'Rahul Verma', 'Sneha Reddy', 'Karthik Iyer',
      'Ananya Singh', 'Vikram Gupta', 'Divya Nair', 'Rohan Kumar', 'Meera Joshi',
      'Aditya Rao', 'Kavya Menon', 'Siddharth Bose', 'Ishita Desai', 'Nikhil Chopra'
    ];

    const avatars = [
      'https://img.rocket.new/generatedImages/rocket_gen_img_1ece17484-1763301747443.png',
      'https://images.unsplash.com/photo-1680506712749-f099c674a806',
      'https://img.rocket.new/generatedImages/rocket_gen_img_141f27d40-1763294845306.png',
      'https://img.rocket.new/generatedImages/rocket_gen_img_1478db155-1763296755656.png'
    ];

    return names?.map((name, index) => ({
      rank: index + 1,
      name: name,
      score: (99 - index * 0.5)?.toFixed(1),
      percentile: (99.9 - index * 0.2)?.toFixed(1),
      avatar: avatars?.[index % avatars?.length],
      avatarAlt: `Profile photo of ${name} ranked ${index + 1} in leaderboard`,
      badge: index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : null,
      streak: Math.floor(Math.random() * 100) + 50,
      questionsAttempted: Math.floor(Math.random() * 500) + 1000
    }));
  };

  const rankingData = generateRankingData();

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

  const getRankColor = (rank) => {
    if (rank <= 3) return 'text-primary font-bold';
    if (rank <= 10) return 'text-foreground font-semibold';
    return 'text-muted-foreground';
  };

  return (
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
              {activeTab === 'streak' ? 'Streak' : 'Score'}
            </th>
            <th className="text-right py-3 px-2 text-xs md:text-sm font-caption font-medium text-muted-foreground">
              {activeTab === 'streak' ? 'Questions' : 'Percentile'}
            </th>
          </tr>
        </thead>
        <tbody>
          {rankingData?.map((entry) => (
            <tr
              key={entry?.rank}
              className="border-b border-border last:border-0 hover:bg-secondary transition-smooth"
            >
              <td className="py-3 px-2">
                <div className="flex items-center gap-2">
                  <span className={`text-sm md:text-base font-caption ${getRankColor(entry?.rank)}`}>
                    #{entry?.rank}
                  </span>
                  {entry?.badge && (
                    <Icon name="Award" size={16} className={getBadgeColor(entry?.badge)} />
                  )}
                </div>
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={entry?.avatar}
                      alt={entry?.avatarAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm md:text-base font-caption font-medium text-foreground">
                    {entry?.name}
                  </span>
                </div>
              </td>
              <td className="py-3 px-2 text-right">
                <span className="text-sm md:text-base font-caption font-semibold text-foreground">
                  {activeTab === 'streak' ? `${entry?.streak} days` : `${entry?.score}%`}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <span className="px-2 py-1 rounded text-xs font-caption font-medium bg-primary/10 text-primary">
                  {activeTab === 'streak' ? entry?.questionsAttempted : `${entry?.percentile}%`}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;