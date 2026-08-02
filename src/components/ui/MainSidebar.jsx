import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

// ── Nav structure ──────────────────────────────────────────────────────────────
const PRIMARY_NAV = [
  { label: 'Dashboard',      path: '/activity-dashboard',     icon: 'LayoutDashboard' },
  { label: 'Practice Lab',   path: '/practice-lab',           icon: 'FlaskConical'    },
  { label: 'Mistake Review', path: '/review',                 icon: 'RefreshCw'       },
  { label: 'Concept Mastery',path: '/concept-mastery-heatmap',icon: 'Grid3x3'         },
  { label: 'Contest Hub',    path: '/contest-hub',            icon: 'Trophy'          },
];

const SECONDARY_NAV = [
  { label: 'Leaderboard',    path: '/leaderboard',            icon: 'Award'           },
  { label: 'Achievements',   path: '/achievements',           icon: 'Medal'           },
  { label: 'Articles',       path: '/articles',               icon: 'FileText'        },
  { label: 'Doubt Solver',   path: '/doubt-solver',           icon: 'MessageCircleQuestion' },
  { label: 'Notifications',  path: '/notifications',          icon: 'Bell'            },
  { label: 'Profile',        path: '/user-profile',           icon: 'User'            },
];

const ALL_NAV = [...PRIMARY_NAV, ...SECONDARY_NAV];

// ── Desktop Sidebar Item ───────────────────────────────────────────────────────
const SidebarItem = ({ item, isActive, onClick }) => (
  <Link
    to={item.path}
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className={`
      flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-smooth
      ${isActive
        ? 'bg-primary/12 text-primary font-semibold'
        : 'text-[#7A8EAD] hover:text-[#C4D0E8] hover:bg-white/[0.04] font-medium'
      }
    `}
  >
    <Icon name={item.icon} size={16} color={isActive ? 'var(--color-primary)' : 'currentColor'} />
    <span className="truncate">{item.label}</span>
    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
  </Link>
);

// ── Mobile Bottom Nav Item ─────────────────────────────────────────────────────
const BottomNavItem = ({ item, isActive, onClick }) => (
  <Link
    to={item.path}
    onClick={onClick}
    aria-current={isActive ? 'page' : undefined}
    className="flex flex-col items-center gap-0.5 py-2 px-1 flex-1 min-w-0 transition-smooth"
  >
    <div className={`p-1.5 rounded-lg transition-smooth ${isActive ? 'bg-primary/15' : ''}`}>
      <Icon name={item.icon} size={18} color={isActive ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
    </div>
    <span className={`text-[10px] font-medium leading-none truncate max-w-full ${isActive ? 'text-primary' : 'text-[#7A8EAD]'}`}>
      {item.label}
    </span>
  </Link>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const MainSidebar = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const anySecondaryActive = SECONDARY_NAV.some(i => isActive(i.path));

  return (
    <>
      {/* ── Desktop Sidebar (lg+) ──────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 h-screen w-56 bg-[#0A1020] border-r border-[#192438] z-40">
        {/* Logo */}
        <Link to="/activity-dashboard" className="flex items-center gap-2.5 px-4 py-4 border-b border-[#192438] flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={16} color="white" />
          </div>
          <div>
            <div className="font-heading font-bold text-sm text-foreground leading-none">BioBridge</div>
            <div className="text-[11px] text-[#7A8EAD] mt-0.5">NEET · JEE Prep OS</div>
          </div>
        </Link>

        {/* Nav — scrollable, never overflows */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-2.5 py-3 flex flex-col gap-0.5" aria-label="Main navigation">
          {/* Primary group */}
          <div className="mb-1">
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#4A5E7A]">Study</p>
            {PRIMARY_NAV.map(item => (
              <SidebarItem key={item.path} item={item} isActive={isActive(item.path)} />
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#192438] mx-3 my-1" />

          {/* Secondary group */}
          <div>
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[#4A5E7A]">More</p>
            {SECONDARY_NAV.map(item => (
              <SidebarItem key={item.path} item={item} isActive={isActive(item.path)} />
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="flex-shrink-0 px-2.5 py-3 border-t border-[#192438]">
          <SidebarItem item={{ label: 'Settings', path: '/settings', icon: 'Settings' }} isActive={isActive('/settings')} />
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation (< lg) ───────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A1020]/95 backdrop-blur-xl border-t border-[#192438]"
           style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-stretch h-14 px-1">
          {PRIMARY_NAV.map(item => (
            <BottomNavItem key={item.path} item={item} isActive={isActive(item.path)} />
          ))}
          {/* More button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 py-2 px-1 flex-1 min-w-0 transition-smooth"
            aria-label="More navigation"
          >
            <div className={`p-1.5 rounded-lg transition-smooth ${anySecondaryActive || drawerOpen ? 'bg-primary/15' : ''}`}>
              <Icon name="MoreHorizontal" size={18} color={anySecondaryActive || drawerOpen ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
            </div>
            <span className={`text-[10px] font-medium leading-none ${anySecondaryActive || drawerOpen ? 'text-primary' : 'text-[#7A8EAD]'}`}>
              More
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] flex flex-col justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />

          {/* Drawer panel */}
          <div className="relative bg-[#0C1221] border-t border-[#243450] rounded-t-2xl px-4 pt-4 pb-6"
               style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
            {/* Drag handle */}
            <div className="w-10 h-1 bg-[#243450] rounded-full mx-auto mb-5" />

            {/* Logo row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Zap" size={14} color="white" />
                </div>
                <span className="font-heading font-bold text-foreground text-sm">BioBridge</span>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#192438] text-[#7A8EAD]">
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* All nav items grid */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {ALL_NAV.map(item => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-smooth border
                      ${active
                        ? 'bg-primary/12 border-primary/25 text-primary'
                        : 'bg-[#111A2C] border-[#192438] text-[#7A8EAD] hover:border-[#243450] hover:text-foreground'
                      }`}
                  >
                    <Icon name={item.icon} size={18} color={active ? 'var(--color-primary)' : 'currentColor'} />
                    <span className="text-[10px] font-medium leading-tight text-center">{item.label}</span>
                  </Link>
                );
              })}
              {/* Settings */}
              <Link
                to="/settings"
                onClick={() => setDrawerOpen(false)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-smooth border
                  ${isActive('/settings')
                    ? 'bg-primary/12 border-primary/25 text-primary'
                    : 'bg-[#111A2C] border-[#192438] text-[#7A8EAD] hover:border-[#243450] hover:text-foreground'
                  }`}
              >
                <Icon name="Settings" size={18} color={isActive('/settings') ? 'var(--color-primary)' : 'currentColor'} />
                <span className="text-[10px] font-medium leading-tight text-center">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainSidebar;
