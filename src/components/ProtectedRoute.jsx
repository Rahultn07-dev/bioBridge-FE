import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps any route that requires authentication.
 *
 * - While auth is loading: show a minimal full-screen spinner.
 * - Unauthenticated: redirect to /login, preserving intended path in state.
 * - Authenticated but onboarding incomplete: redirect to /onboarding.
 * - Authenticated + onboarded: render children.
 *
 * Optional `allowedRoles` prop restricts access by backend role string
 * e.g. allowedRoles={['STUDENT']} or allowedRoles={['TEACHER', 'INSTITUTION_TEACHER']}
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authLoading, isAuthenticated, profile } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Onboarding gate — skip for the /onboarding route itself
  if (profile && !profile.onboardingCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // Role-based access guard
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirect to their home instead of a 403 page
    const home = profile.role === 'TEACHER' ? '/teacher'
               : profile.role === 'INSTITUTION_TEACHER' ? '/institution-teacher'
               : profile.role === 'INSTITUTION' ? '/institution'
               : '/dashboard';
    return <Navigate to={home} replace />;
  }

  return children;
};

export default ProtectedRoute;
