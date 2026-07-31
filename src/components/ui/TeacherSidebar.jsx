import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const navSections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/teacher', icon: 'LayoutDashboard' },
      { label: 'My Students', path: '/teacher/students', icon: 'Users' },
    ],
  },
  {
    label: 'Teaching',
    items: [
      { label: 'POD Builder', path: '/teacher/pod', icon: 'Calendar' },
      { label: 'Question Bank', path: '/teacher/questions', icon: 'BookOpen' },
      { label: 'Explanations', path: '/teacher/explanations', icon: 'PlayCircle' },
      { label: 'Materials', path: '/teacher/materials', icon: 'FolderOpen' },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Doubt Pool', path: '/teacher/doubts', icon: 'MessageCircleQuestion', badge: 3 },
    ],
  },
  {
    label: 'Batch',
    items: [
      { label: 'Batch Settings', path: '/teacher/batch', icon: 'Settings' },
    ],
  },
];

const TeacherSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/teacher') return location.pathname === '/teacher';
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-[#1E2D44]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center flex-shrink-0">
            <Icon name="GraduationCap" size={17} className="text-sky-400" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-heading font-bold text-foreground truncate">Mr. Arun Sharma</div>
            <div className="text-[11px] text-sky-400 font-medium">Teacher Portal</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-sky-500/8 border border-sky-500/15 rounded-lg">
          <Icon name="Users" size={11} className="text-sky-400" />
          <span className="text-[11px] text-sky-300 font-semibold">NEET Batch A · 34 students</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="px-2 mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
              {section.label}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-all ${
                      active
                        ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20 font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary font-medium'
                    }`}
                  >
                    <Icon name={item.icon} size={15} className={active ? 'text-sky-400' : 'opacity-70'} />
                    <span className="flex-1 leading-none">{item.label}</span>
                    {item.badge ? (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-tight">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Student view link */}
      <div className="px-3 py-2 border-t border-[#1E2D44]">
        <Link
          to="/activity-dashboard"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-all font-medium"
        >
          <Icon name="ExternalLink" size={14} className="opacity-60" />
          <span>Student View</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center text-xs font-bold text-sky-400 flex-shrink-0">
            AS
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-foreground truncate">Arun Sharma</div>
            <div className="text-[10px] text-muted-foreground truncate">Physics · 8 yrs exp</div>
          </div>
          <Icon name="LogOut" size={13} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-[#07111E] border-r border-[#1E2D44] flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center"
      >
        <Icon name="Menu" size={16} className="text-foreground" />
      </button>
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-56 bg-[#07111E] border-r border-[#1E2D44] z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default TeacherSidebar;
