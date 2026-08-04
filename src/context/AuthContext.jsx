import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  firebaseSignOut,
} from '../lib/firebase';
import { getMe, postLogin } from '../lib/api';

/**
 * AuthResponse shape from the backend:
 * {
 *   userId, firebaseUid, email, role,
 *   isActive, emailVerified,
 *   onboardingCompleted, onboardingStep,
 *   lastLogin, createdAt
 * }
 */

const AuthContext = createContext(null);

// Maps backend role → portal home route
const ROLE_HOME = {
  STUDENT:             '/dashboard',
  TEACHER:             '/teacher',
  INSTITUTION_TEACHER: '/institution-teacher',
  INSTITUTION:         '/institution',
};

export const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(undefined); // undefined = loading
  const [profile, setProfile]           = useState(null);       // AuthResponse from backend
  const [authLoading, setAuthLoading]   = useState(true);

  // ── Resolve backend profile after Firebase auth state confirms ────────────
  const resolveProfile = useCallback(async (fbUser, role) => {
    if (!fbUser) {
      setProfile(null);
      setAuthLoading(false);
      return;
    }
    try {
      // 1. Try fetching existing profile
      const res = await getMe();
      setProfile(res.data);
    } catch (err) {
      if (err.response?.status === 404 || err.response?.status === 401) {
        try {
          // 2. First login — register with chosen role
          const reg = await postLogin(role || 'STUDENT');
          setProfile(reg.data);
        } catch {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    } finally {
      setAuthLoading(false);
    }
  }, []);

  // ── Listen for Firebase auth state changes ────────────────────────────────
  useEffect(() => {
    if (!auth) {
      // Mock mode: read from localStorage so existing demo flows still work
      const mockProfile = (() => {
        try { return JSON.parse(localStorage.getItem('bb_mock_profile')); } catch { return null; }
      })();
      setProfile(mockProfile);
      setFirebaseUser(mockProfile ? { uid: 'mock' } : null);
      setAuthLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseUser(fbUser);
      await resolveProfile(fbUser, null);
    });
    return unsub;
  }, [resolveProfile]);

  // ── Routing helper: called after resolveProfile completes ─────────────────
  const getDestination = useCallback((p) => {
    if (!p) return '/login';
    if (!p.onboardingCompleted) return '/onboarding';
    return ROLE_HOME[p.role] || '/dashboard';
  }, []);

  // ── Public API ─────────────────────────────────────────────────────────────
  const signIn = async (email, password, selectedRole) => {
    if (auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // resolveProfile triggers via onAuthStateChanged
      return cred;
    }
    // Mock mode — student/tutor start at onboarding; institution roles skip it
    const backendRole = roleLabelToBackend(selectedRole);
    const skipOnboarding = backendRole === 'INSTITUTION' || backendRole === 'INSTITUTION_TEACHER';
    const mockP = {
      userId: 1, firebaseUid: 'mock', email,
      role: backendRole,
      isActive: true, emailVerified: true,
      onboardingCompleted: skipOnboarding,
      onboardingStep: skipOnboarding ? 3 : 0,
    };
    localStorage.setItem('bb_mock_profile', JSON.stringify(mockP));
    setProfile(mockP);
    setFirebaseUser({ uid: 'mock' });
    return { user: { uid: 'mock' } };
  };

  const signUp = async (email, password, role) => {
    if (auth) {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      // After creating the Firebase account, register with backend
      const reg = await postLogin(roleLabelToBackend(role));
      setProfile(reg.data);
      return cred;
    }
    // Mock mode
    const mockP = {
      userId: 1, firebaseUid: 'mock', email,
      role: roleLabelToBackend(role),
      isActive: true, emailVerified: false,
      onboardingCompleted: false, onboardingStep: 0,
    };
    localStorage.setItem('bb_mock_profile', JSON.stringify(mockP));
    setProfile(mockP);
    setFirebaseUser({ uid: 'mock' });
    return { user: { uid: 'mock' } };
  };

  const signOut = async () => {
    if (auth) await firebaseSignOut(auth);
    localStorage.removeItem('bb_mock_profile');
    localStorage.removeItem('isAuthenticated');
    setProfile(null);
    setFirebaseUser(null);
  };

  const updateProfile = (partial) => setProfile(p => p ? { ...p, ...partial } : p);

  return (
    <AuthContext.Provider value={{
      firebaseUser,
      profile,
      authLoading,
      isAuthenticated: !!firebaseUser && !!profile,
      signIn,
      signUp,
      signOut,
      updateProfile,
      getDestination,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function roleLabelToBackend(role) {
  const map = {
    student:             'STUDENT',
    tutor:               'TEACHER',
    institution_teacher: 'INSTITUTION_TEACHER',
    institution:         'INSTITUTION',
    STUDENT:             'STUDENT',
    TEACHER:             'TEACHER',
  };
  return map[role] || 'STUDENT';
}

export { ROLE_HOME };
