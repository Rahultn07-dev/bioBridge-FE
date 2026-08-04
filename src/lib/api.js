import axios from 'axios';
import { auth } from './firebase';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// ── Mock-mode config (set VITE_USE_MOCK_AUTH=true in .env for local dev) ──────
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';
const MOCK_DEFAULTS = {
  userId:      import.meta.env.VITE_MOCK_USER_ID   || '1',
  role:        import.meta.env.VITE_MOCK_ROLE       || 'STUDENT',
  firebaseUid: import.meta.env.VITE_MOCK_UID        || 'test-uid-123',
  email:       import.meta.env.VITE_MOCK_EMAIL      || 'student@test.com',
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach auth headers before every request ─────────────
api.interceptors.request.use(async (config) => {
  if (USE_MOCK) {
    config.headers['X-Mock-User-Id']      = MOCK_DEFAULTS.userId;
    config.headers['X-Mock-Role']         = MOCK_DEFAULTS.role;
    config.headers['X-Mock-Firebase-Uid'] = MOCK_DEFAULTS.firebaseUid;
    config.headers['X-Mock-Email']        = MOCK_DEFAULTS.email;
  } else if (auth?.currentUser) {
    try {
      const token = await auth.currentUser.getIdToken(true);
      config.headers['Authorization'] = `Bearer ${token}`;
    } catch {
      // token refresh failed — let request proceed; backend will 401
    }
  }
  return config;
}, (error) => Promise.reject(error));

// ── Response interceptor: normalise fieldErrors into thrown error ─────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    if (data) {
      // Attach structured fieldErrors to the thrown error so callers can map them
      error.fieldErrors  = data.fieldErrors  || {};
      error.serverMessage = data.message     || data.error || 'Something went wrong.';
      error.status       = data.status       || error.response?.status;
    }
    return Promise.reject(error);
  }
);

// ── Convenience auth endpoints ────────────────────────────────────────────────

/** Check if current Firebase user already has a backend record */
export const getMe = () => api.get('/api/auth/me');

/** First-time sign-up: tell backend the chosen role */
export const postLogin = (role) => api.post('/api/auth/login', { role });

// ── Student onboarding endpoints ──────────────────────────────────────────────
export const getStudentOnboardingState = () => api.get('/api/onboarding/state');
export const patchStudentStep = (step, body) => api.patch(`/api/onboarding/step/${step}`, body);

// ── Tutor onboarding endpoints ────────────────────────────────────────────────
export const getTutorOnboardingState = () => api.get('/api/onboarding/tutor/state');
export const patchTutorStep = (step, body) => api.patch(`/api/onboarding/tutor/step/${step}`, body);

// ── Invitation enrollment ─────────────────────────────────────────────────────
export const acceptInvitation = (token) => api.get('/api/invitations/accept', { params: { token } });

export default api;
