import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import RankingTable from './components/RankingTable';
import LeaderboardFilters from './components/LeaderboardFilters';
import PersonalRanking from './components/PersonalRanking';
import AchievementShowcase from './components/AchievementShowcase';

const Leaderboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overall');
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/activity-dashboard' },
    { label: 'Leaderboard', path: '/leaderboard' }
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar isCollapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-60">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            <BreadcrumbTrail items={breadcrumbItems} />

            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                Leaderboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-caption">
                Track your competitive rankings and achievements across NEET/JEE preparation
              </p>
            </div>

            <PersonalRanking />

            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {['overall', 'subject', 'contest', 'streak']?.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-caption font-medium transition-smooth ${
                        activeTab === tab
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {tab?.charAt(0)?.toUpperCase() + tab?.slice(1)} Rankings
                    </button>
                  ))}
                </div>

                <LeaderboardFilters
                  selectedPeriod={selectedPeriod}
                  setSelectedPeriod={setSelectedPeriod}
                  selectedExam={selectedExam}
                  setSelectedExam={setSelectedExam}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                  activeTab={activeTab}
                />
              </div>

              <RankingTable
                activeTab={activeTab}
                selectedPeriod={selectedPeriod}
                selectedExam={selectedExam}
                selectedSubject={selectedSubject}
              />
            </div>

            <AchievementShowcase />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;