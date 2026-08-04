import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../context/AuthContext';
import { acceptInvitation } from '../../lib/api';

/**
 * /join?token={uuid}
 *
 * Flow:
 * 1. Check for token in URL — if missing, show error.
 * 2. Check auth state.
 *    - Unauthenticated → redirect to /login preserving ?token in state.
 *    - Authenticated but role is not STUDENT → show role-mismatch error.
 * 3. Call GET /api/invitations/accept?token={uuid}
 *    - 200 → show premium success card, then redirect to /dashboard after 2.5s.
 *    - 410 → show expired/invalid error.
 *    - 403 → show email-mismatch error.
 */

const STATUS = {
  LOADING:  'loading',
  SUCCESS:  'success',
  EXPIRED:  'expired',
  MISMATCH: 'mismatch',
  ERROR:    'error',
  NO_TOKEN: 'no_token',
};

const JoinBatch = () => {
  const [searchParams] = useSearchParams();
  const navigate        = useNavigate();
  const { isAuthenticated, authLoading, profile } = useAuth();

  const token = searchParams.get('token');
  const [status, setStatus]           = useState(STATUS.LOADING);
  const [batchName, setBatchName]     = useState('');
  const [countdown, setCountdown]     = useState(3);

  useEffect(() => {
    if (!token) {
      setStatus(STATUS.NO_TOKEN);
      return;
    }

    // Wait for auth to resolve before acting
    if (authLoading) return;

    if (!isAuthenticated) {
      // Preserve token for after login
      navigate(`/login?invite=${encodeURIComponent(token)}`, { replace: true });
      return;
    }

    // Role guard — only students can join batches
    if (profile && profile.role !== 'STUDENT') {
      setStatus(STATUS.ERROR);
      return;
    }

    // Call the API
    const accept = async () => {
      try {
        const res = await acceptInvitation(token);
        setBatchName(res.data?.batchName || 'your new batch');
        setStatus(STATUS.SUCCESS);
      } catch (err) {
        const httpStatus = err.response?.status || err.status;
        if (httpStatus === 410) {
          setStatus(STATUS.EXPIRED);
        } else if (httpStatus === 403) {
          setStatus(STATUS.MISMATCH);
        } else {
          setStatus(STATUS.ERROR);
        }
      }
    };

    accept();
  }, [token, authLoading, isAuthenticated, profile, navigate]);

  // Auto-redirect after success
  useEffect(() => {
    if (status !== STATUS.SUCCESS) return;
    if (countdown <= 0) { navigate('/dashboard', { replace: true }); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, navigate]);

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (status === STATUS.LOADING) {
    return (
      <Screen>
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-muted-foreground">Verifying your invitation…</p>
        </div>
      </Screen>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (status === STATUS.SUCCESS) {
    return (
      <Screen>
        <div className="w-full max-w-md bg-card border border-emerald-500/25 rounded-2xl p-8 shadow-xl text-center">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Icon name="PartyPopper" size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-foreground mb-2">Welcome to the batch!</h1>
          <p className="text-sm text-muted-foreground mb-6">
            You have been successfully added to <strong className="text-foreground">{batchName}</strong>.
            Your teacher can now assign you questions, PODs, and materials.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/8 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-medium mb-6">
            <Icon name="CheckCircle" size={14} />
            Enrollment confirmed
          </div>
          <p className="text-xs text-muted-foreground mb-5">
            Redirecting to your dashboard in <strong className="text-foreground">{countdown}s</strong>…
          </p>
          <Link to="/dashboard"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-smooth">
            Go to Dashboard <Icon name="ArrowRight" size={15} color="white" />
          </Link>
        </div>
      </Screen>
    );
  }

  // ── Expired / Invalid ────────────────────────────────────────────────────────
  if (status === STATUS.EXPIRED) {
    return (
      <ErrorScreen
        icon="ClockX"
        iconColor="text-amber-400"
        iconBg="bg-amber-500/10 border-amber-500/20"
        title="Invitation expired"
        message="This invitation link has expired or is no longer valid. Please ask your teacher to send a new invitation."
      />
    );
  }

  // ── Email mismatch ───────────────────────────────────────────────────────────
  if (status === STATUS.MISMATCH) {
    return (
      <ErrorScreen
        icon="UserX"
        iconColor="text-[#F87171]"
        iconBg="bg-[#F87171]/10 border-[#F87171]/20"
        title="Email mismatch"
        message="This invitation was sent to a different email address. Please sign out and sign in with the email your teacher invited."
        action={{ label: 'Sign in with a different account', to: '/login' }}
      />
    );
  }

  // ── Role error ───────────────────────────────────────────────────────────────
  if (status === STATUS.ERROR && profile?.role !== 'STUDENT') {
    return (
      <ErrorScreen
        icon="ShieldAlert"
        iconColor="text-[#F87171]"
        iconBg="bg-[#F87171]/10 border-[#F87171]/20"
        title="Not a student account"
        message="Batch invitations can only be accepted with a student account. Please sign in with your student credentials."
        action={{ label: 'Sign in as student', to: '/login' }}
      />
    );
  }

  // ── No token / generic error ──────────────────────────────────────────────────
  return (
    <ErrorScreen
      icon="LinkX"
      iconColor="text-[#F87171]"
      iconBg="bg-[#F87171]/10 border-[#F87171]/20"
      title="Invalid invitation link"
      message="The invitation link you followed is missing or malformed. Please use the original link from your invitation email."
      action={{ label: 'Go to home', to: '/' }}
    />
  );
};

// ── Layout shell ───────────────────────────────────────────────────────────────
const Screen = ({ children }) => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
    <div className="flex items-center gap-2.5 mb-10">
      <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
        <Icon name="Zap" size={18} className="text-white" />
      </div>
      <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
    </div>
    {children}
  </div>
);

// ── Reusable error card ────────────────────────────────────────────────────────
const ErrorScreen = ({ icon, iconColor, iconBg, title, message, action }) => (
  <Screen>
    <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-xl text-center">
      <div className={`w-16 h-16 border rounded-2xl flex items-center justify-center mx-auto mb-5 ${iconBg}`}>
        <Icon name={icon} size={32} className={iconColor} />
      </div>
      <h1 className="text-xl font-heading font-bold text-foreground mb-3">{title}</h1>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{message}</p>
      {action ? (
        <Link to={action.to}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-smooth">
          {action.label} <Icon name="ArrowRight" size={15} color="white" />
        </Link>
      ) : (
        <Link to="/"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors">
          <Icon name="ArrowLeft" size={14} /> Back to home
        </Link>
      )}
    </div>
  </Screen>
);

export default JoinBatch;
