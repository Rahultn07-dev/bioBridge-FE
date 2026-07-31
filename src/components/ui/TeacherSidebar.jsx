import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const TeacherSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/teacher', icon: 'LayoutDashboard', tooltip: 'Teacher overview and batch stats' },
    { label: 'My Students', path: '/teacher/students', icon: 'Users', tooltip: 'Student list and analytics' },
    { label: 'Doubt Pool', path: '/teacher/doubts', icon: 'MessageCircleQuestion', tooltip: 'Escalated student doubts', badge: 3 },
    { label: 'Question Bank', path: '/teacher/questions', icon: 'FileQuestion', tooltip: 'Manage and upload questions' },
    { label: 'POD Builder', path: '/teacher/pod', icon: 'Calendar', tooltip: 'Configure daily practice' },
    { label: 'Materials', path: '/teacher/materials', icon: 'FolderOpen', tooltip: 'Upload videos and PDFs' },
    { label: 'Batch Settings', path: '/teacher/batch', icon: 'Settings', tooltip: 'Manage batch configuration' },
  ];

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="px-4 py-5 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="Zap" size={16} className="text-white" />
        </div>
        <div>
          <div className="font-heading font-bold text-foreground text-sm">BioBridge</div>
          <div className="text-xs text-muted-foreground">Teacher Portal</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <Link to="/activity-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
          <Icon name="GraduationCap" size={18} />
          <span>Student View</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 bg-card border-r border-border flex-shrink-0 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center"
      >
        <Icon name="Menu" size={16} className="text-foreground" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 lg:hidden">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};

export default TeacherSidebar;
