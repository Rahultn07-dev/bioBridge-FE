import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ customItems = null }) => {
  const location = useLocation();

  const routeLabels = {
    '/activity-dashboard': 'Dashboard',
    '/concept-mastery-heatmap': 'Concept Analysis',
    '/practice-lab': 'Practice Lab',
    '/doubt-solver': 'Doubt Solver',
    '/login': 'Login',
    '/register': 'Register',
    '/settings': 'Settings'
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/activity-dashboard' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      breadcrumbs?.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm font-caption">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isFirst = index === 0;

          return (
            <li key={crumb?.path} className="flex items-center gap-2">
              {!isFirst && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  color="var(--color-muted-foreground)" 
                />
              )}
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {crumb?.label}
                </span>
              ) : (
                <Link
                  to={crumb?.path}
                  className="text-muted-foreground hover:text-foreground transition-smooth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded px-1"
                >
                  {crumb?.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;