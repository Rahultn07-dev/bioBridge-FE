import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const navSections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: '/institution-teacher', icon: 'LayoutDashboard' },
    ],
  },
  {
    label: 'My Batch',
    items: [
      { label: 'Students', path: '/institution-teacher/students', icon: 'Users' },
      { label: 'POD Schedule', path: '/institution-teacher/pod', icon: 'Calendar' },
      { label: 'Doubt Queue', path: '/institution-teacher/doubts', icon: 'MessageCircleQuestion', badge: 4 },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Question Bank', path: '/institution-teacher/questions', icon: 'BookOpen' },
      { label: 'Explanations', path: '/institution-teacher/explanations', icon: 'PlayCircle' },
    ],
  },
];

const InstitutionTeacherSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/institution-teacher') return location.pathname === '/institution-teacher';
    return location.pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-[#1E2D44] flex-shrink-0">
        {/* Portal tag */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
            <Icon name="School" size={15} className="text-teal-400" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-heading font-bold text-foreground truncate">Mrs. Sunita Rao</div>
            <div className="text-[11px] text-teal-400 font-medium">Institution Teacher</div>
          </div>
        </div>
        {/* Assigned institution + batch pill */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/8 border border-indigo-500/15 rounded-md">
            <Icon name="Building2" size={10} className="text-indigo-400" />
            <span className="text-[11px] text-indigo-300 font-semibold truncate">Allen Kota</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-teal-500/8 border border-teal-500/15 rounded-md">
            <Icon name="Users" size={10} className="text-teal-400" />
            <span className="text-[11px] text-teal-300 font-semibold truncate">NEET Batch B · 38 students</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3 space-y-4 min-h-0">
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
                        ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary font-medium'
                    }`}
                  >
                    <Icon name={item.icon} size={15} className={active ? 'text-teal-400' : 'opacity-70'} />
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

      {/* Back to institution link — read-only, can't manage institution */}
      <div className="px-3 py-2 border-t border-[#1E2D44] flex-shrink-0">
        <div className="px-2.5 py-2 rounded-lg bg-secondary/40 border border-border">
          <div className="text-[10px] text-muted-foreground/70 font-semibold uppercase tracking-wide mb-1">Institution Admin</div>
          <div className="text-[11px] text-muted-foreground italic">Contact your institution admin for batch or settings changes.</div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 pt-2 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-xs font-bold text-teal-400 flex-shrink-0">
            SR
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-semibold text-foreground truncate">Sunita Rao</div>
            <div className="text-[10px] text-muted-foreground truncate">Biology · Allen Kota</div>
          </div>
          <Icon name="LogOut" size={13} className="text-muted-foreground group-hover:text-rose-400 transition-colors" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-56 flex-shrink-0 bg-[#070E1B] border-r border-[#1E2D44] flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-card border border-border rounded-lg flex items-center justify-center"
        aria-label="Open navigation"
      >
        <Icon name="Menu" size={16} className="text-foreground" />
      </button>
      {mobileOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-56 bg-[#070E1B] border-r border-[#1E2D44] z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default InstitutionTeacherSidebar;
