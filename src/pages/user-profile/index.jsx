import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProfileHeader from './components/ProfileHeader';
import PerformanceStats from './components/PerformanceStats';
import LearningAnalytics from './components/LearningAnalytics';
import AchievementGallery from './components/AchievementGallery';
import SettingsPanel from './components/SettingsPanel';

const UserProfile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

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
    { label: 'Profile', path: '/user-profile' }
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <MainSidebar isCollapsed={isSidebarCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            <BreadcrumbTrail items={breadcrumbItems} />

            <ProfileHeader />

            <div className="flex flex-wrap gap-2 border-b border-border pb-4">
              {['overview', 'analytics', 'achievements', 'settings']?.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm font-caption font-medium transition-smooth ${
                    activeSection === section
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {section?.charAt(0)?.toUpperCase() + section?.slice(1)}
                </button>
              ))}
            </div>

            {activeSection === 'overview' && (
              <div className="space-y-6">
                <PerformanceStats />
                <LearningAnalytics />
              </div>
            )}

            {activeSection === 'analytics' && <LearningAnalytics detailed />}

            {activeSection === 'achievements' && <AchievementGallery />}

            {activeSection === 'settings' && <SettingsPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;