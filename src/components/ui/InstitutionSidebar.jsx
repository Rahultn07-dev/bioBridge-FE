import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const navSections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/institution', icon: 'LayoutDashboard' },
      { label: 'Analytics', path: '/institution/analytics', icon: 'BarChart3' },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Batches', path: '/institution/batches', icon: 'Layers' },
      { label: 'Teachers', path: '/institution/teachers', icon: 'UserCheck' },
      { label: 'Students', path: '/institution/students', icon: 'GraduationCap' },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Question Bank', path: '/institution/questions', icon: 'BookOpen' },
      { label: 'Materials', path: '/institution/materials', icon: 'FolderOpen' },
      { label: 'Doubt Pool', path: '/institution/doubts', icon: 'MessageCircleQuestion', badge: 3 },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', path: '/institution/settings', icon: 'Settings' },
    ],
  },
];

const InstitutionSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/institution') return location.pathname === '/institution';
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-[#1E2D44]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
            <Icon name="Building2" size={17} className="text-indigo-400" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-heading font-bold text-foreground truncate">Allen Career</div>
            <div className="text-[11px] text-indigo-400 font-medium">Institution Admin</div>
          </div>
        </div>
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-indigo-500/8 border border-indigo-500/15 rounded-lg">
          <span className="text-[11px] text-indigo-300 font-semibold">BASIC Plan</span>
          <button className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold transition-colors">Upgrade →</button>
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
                    className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                      active
                        ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary font-medium'
                    }`}
                  >
                    <Icon name={item.icon} size={15} className={active ? 'text-indigo-400' : 'opacity-70'} />
                    <span className="flex-1 text-[13px] leading-none">{item.label}</span>
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

      {/* Footer */}
      <div className="px-3 py-3 border-t border-[#1E2D44]">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-foreground truncate">Admin</div>
            <div className="text-[10px] text-muted-foreground truncate">admin@allen.in</div>
          </div>
          <Icon name="LogOut" size={13} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-[#080F1C] border-r border-[#1E2D44] flex-col h-screen sticky top-0">
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
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-56 bg-[#080F1C] border-r border-[#1E2D44] z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default InstitutionSidebar;
