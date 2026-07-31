import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import NavigationItem from './NavigationItem';

const MainSidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/activity-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Home — streak, daily POD, heatmap, concept gaps'
    },
    {
      label: 'Practice Lab',
      path: '/practice-lab',
      icon: 'FlaskConical',
      tooltip: 'Solve questions with subject / chapter filters'
    },
    {
      label: 'Mistake Review',
      path: '/review',
      icon: 'RefreshCw',
      tooltip: 'SM-2 spaced repetition review queue'
    },
    {
      label: 'Concept Mastery',
      path: '/concept-mastery-heatmap',
      icon: 'Grid3x3',
      tooltip: 'Concept-level accuracy heatmap'
    },
    {
      label: 'Contest Hub',
      path: '/contest-hub',
      icon: 'Trophy',
      tooltip: 'Mock tests and live contests'
    },
    {
      label: 'Leaderboard',
      path: '/leaderboard',
      icon: 'Award',
      tooltip: 'Overall, subject and batch rankings'
    },
    {
      label: 'Articles',
      path: '/articles',
      icon: 'FileText',
      tooltip: 'Community articles and concept explanations'
    },
    {
      label: 'Doubt Solver',
      path: '/doubt-solver',
      icon: 'MessageCircleQuestion',
      tooltip: 'AI doubt solver — NCERT + videos + web'
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: 'Bell',
      tooltip: 'Streak alerts, achievements and updates'
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      tooltip: 'Your profile, achievements and settings'
    }
  ];

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleMobileClose = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      <button
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-50 lg:hidden w-11 h-11 flex items-center justify-center bg-card border border-border rounded-md transition-smooth hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={20} color="var(--color-foreground)" />
      </button>
      <aside
        className={`
          fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border z-40
          transition-smooth
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo/Header Section */}
        <div className="flex items-center px-4 py-5 border-b border-border">
          <Link to="/activity-dashboard" className="flex items-center gap-3 w-full min-w-0">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary flex-shrink-0">
              <Icon name="Zap" size={18} color="white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="font-heading font-bold text-base text-foreground leading-tight">BioBridge</div>
                <div className="text-xs text-muted-foreground truncate">NEET · JEE Prep OS</div>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {navigationItems?.map((item) => (
            <NavigationItem
              key={item?.path}
              label={item?.label}
              path={item?.path}
              icon={item?.icon}
              tooltip={item?.tooltip}
              isActive={location?.pathname === item?.path}
              isCollapsed={isCollapsed}
              onClick={handleMobileClose}
            />
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <NavigationItem
            label="Settings"
            path="/settings"
            icon="Settings"
            tooltip="Application settings and preferences"
            isActive={location?.pathname === '/settings'}
            isCollapsed={isCollapsed}
            onClick={handleMobileClose}
          />
        </div>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background z-30 lg:hidden"
          onClick={handleMobileClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default MainSidebar;
