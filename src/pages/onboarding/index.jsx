import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import {
  getStudentOnboardingState,
  patchStudentStep,
  getTutorOnboardingState,
  patchTutorStep,
} from '../../lib/api';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STUDENT_STEPS = [
  { id: 'personal',     label: 'Personal' },
  { id: 'academic',     label: 'Academic' },
  { id: 'exam',         label: 'Exam' },
  { id: 'timeline',     label: 'Timeline' },
  { id: 'preferences',  label: 'Preferences' },
];

const TUTOR_STEPS = [
  { id: 'profile',   label: 'Profile' },
  { id: 'subjects',  label: 'Subjects' },
  { id: 'settings',  label: 'Settings' },
];

const GENDER_OPTIONS = [
  { val: 'male',             label: 'Male' },
  { val: 'female',           label: 'Female' },
  { val: 'other',            label: 'Other' },
  { val: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const EXAM_OPTIONS = [
  { val: 'NEET',    label: 'NEET',    desc: 'Physics · Chemistry · Biology · 720 marks', icon: 'Dna' },
  { val: 'JEE',     label: 'JEE',     desc: 'Physics · Chemistry · Mathematics · 360 marks', icon: 'Cpu' },
  { val: 'BOTH',    label: 'NEET + JEE', desc: 'Preparing for both exams', icon: 'Target' },
  { val: 'NEET_PG', label: 'NEET PG', desc: 'Postgraduate medical entrance', icon: 'Stethoscope' },
];

const CLASS_OPTIONS = [
  { val: '11',       label: 'Class 11', desc: 'Starting out' },
  { val: '12',       label: 'Class 12', desc: 'Final year' },
  { val: 'Dropper',  label: 'Dropper',  desc: 'Repeating year' },
  { val: 'Graduate', label: 'Graduate', desc: 'Post-graduation' },
];

const STUDY_MODE_OPTIONS = [
  { val: 'ADAPTIVE', icon: 'Brain',     title: 'Adaptive', desc: 'AI picks difficulty for you' },
  { val: 'FIXED',    icon: 'BarChart2', title: 'Fixed',    desc: 'Set difficulty stays constant' },
  { val: 'CUSTOM',   icon: 'Settings',  title: 'Custom',   desc: 'You control the mix manually' },
];

const EXAM_CONTEXT_SUBJECTS = {
  NEET:    ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
  JEE:     ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
  BOTH:    ['Physics', 'Chemistry', 'Biology', 'Mathematics'],
  NEET_PG: [
    'Anatomy','Physiology','Biochemistry','Pathology','Microbiology',
    'Pharmacology','Forensic Medicine','Community Medicine','General Medicine',
    'General Surgery','Obstetrics and Gynaecology','Paediatrics','Orthopaedics',
    'Ophthalmology','ENT','Psychiatry','Dermatology','Radiology','Anaesthesia',
  ],
};

const CURRENT_YEAR = new Date().getFullYear();

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Shallow merge partial API state into a form object, skipping undefined/null */
const mergeState = (form, apiData = {}) => {
  const merged = { ...form };
  Object.keys(apiData).forEach((k) => {
    if (apiData[k] !== undefined && apiData[k] !== null) merged[k] = apiData[k];
  });
  return merged;
};

/** Map backend fieldErrors object to inline messages — returns '' when none */
const fieldErr = (fieldErrors, key) => (fieldErrors && fieldErrors[key]) || '';

// ─────────────────────────────────────────────────────────────────────────────
// Field-level inline error component
// ─────────────────────────────────────────────────────────────────────────────
const FieldError = ({ msg }) =>
  msg ? <p className="text-xs text-[#F87171] mt-1">{msg}</p> : null;

// ─────────────────────────────────────────────────────────────────────────────
// Onboarding page
// ─────────────────────────────────────────────────────────────────────────────

const Onboarding = () => {
  const navigate = useNavigate();
  const { profile, updateProfile } = useAuth();

  // Derive role from backend profile
  const role = profile?.role; // 'STUDENT' | 'TEACHER'
  const isStudent = role === 'STUDENT';
  const isTutor   = role === 'TEACHER';

  const STEPS = isStudent ? STUDENT_STEPS : TUTOR_STEPS;

  // Resume from last completed step (onboardingStep = last completed, so start at +1, 0-indexed)
  const resumeStep = Math.max(0, Math.min((profile?.onboardingStep ?? 0), STEPS.length - 1));
  const [step, setStep]       = useState(resumeStep);
  const [loadingState, setLoadingState] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState('');

  // ── Student form ────────────────────────────────────────────────────────────
  const [student, setStudent] = useState({
    name:              '',
    dateOfBirth:       '',
    gender:            '',
    profileImageUrl:   '',
    studentClass:      '',
    schoolCollegeName: '',
    targetExam:        '',
    expectedExamYear:  CURRENT_YEAR + 1,
    expectedExamMonth: 5,
    targetScore:       500,
    dailyQuestionGoal: 20,
    studyMode:         'ADAPTIVE',
    prefEasy:          33,
    prefMedium:        34,
    prefHard:          33,
  });

  // ── Tutor form ──────────────────────────────────────────────────────────────
  const [tutor, setTutor] = useState({
    name:              '',
    bio:               '',
    profileImageUrl:   '',
    experienceYears:   0,
    subjects:          [],
    examContext:       '',
    specialization:    '',
    tutorPublicProfile: true,
    tutorBio:          '',
  });

  // ── Load state from backend on mount ────────────────────────────────────────
  const loadState = useCallback(async () => {
    setLoadingState(true);
    try {
      if (isStudent) {
        const { data } = await getStudentOnboardingState();
        setStudent(prev => mergeState(prev, data));
      } else if (isTutor) {
        const { data } = await getTutorOnboardingState();
        setTutor(prev => mergeState(prev, data));
      }
    } catch {
      // Non-fatal — user starts with blank form
    } finally {
      setLoadingState(false);
    }
  }, [isStudent, isTutor]);

  useEffect(() => { loadState(); }, [loadState]);

  // ── Setters ──────────────────────────────────────────────────────────────────
  const setS = (k, v) => { setStudent(p => ({ ...p, [k]: v })); setFieldErrors(p => ({ ...p, [k]: '' })); };
  const setT = (k, v) => { setTutor(p => ({ ...p, [k]: v }));   setFieldErrors(p => ({ ...p, [k]: '' })); };
  const toggleSubject = (s) => {
    setTutor(prev => ({
      ...prev,
      subjects: prev.subjects.includes(s) ? prev.subjects.filter(x => x !== s) : [...prev.subjects, s],
    }));
  };

  // ── Max score by exam ────────────────────────────────────────────────────────
  const maxScore = student.targetExam === 'JEE' ? 300 : 720;

  // ── Student step validation (client-side guard before PATCH) ─────────────────
  const validateStudentStep = () => {
    const errs = {};
    if (step === 0) {
      if (!student.name.trim() || student.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
      if (!student.dateOfBirth) errs.dateOfBirth = 'Date of birth is required.';
      if (!student.gender) errs.gender = 'Please select a gender.';
    }
    if (step === 1) {
      if (!student.studentClass) errs.studentClass = 'Please select your class.';
    }
    if (step === 2) {
      if (!student.targetExam) errs.targetExam = 'Please select a target exam.';
    }
    if (step === 3) {
      if (student.expectedExamYear < CURRENT_YEAR) errs.expectedExamYear = `Year must be ${CURRENT_YEAR} or later.`;
      if (student.expectedExamMonth < 1 || student.expectedExamMonth > 12) errs.expectedExamMonth = 'Month must be 1–12.';
      if (student.targetScore < 0 || student.targetScore > maxScore) errs.targetScore = `Score must be 0–${maxScore}.`;
    }
    if (step === 4) {
      if (student.dailyQuestionGoal < 1 || student.dailyQuestionGoal > 100) errs.dailyQuestionGoal = 'Goal must be 1–100.';
      const total = student.prefEasy + student.prefMedium + student.prefHard;
      if (total !== 100) errs.prefMix = `Difficulty percentages must sum to 100 (currently ${total}).`;
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Tutor step validation ────────────────────────────────────────────────────
  const validateTutorStep = () => {
    const errs = {};
    if (step === 0) {
      if (!tutor.name.trim() || tutor.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
      if (tutor.experienceYears < 0 || tutor.experienceYears > 60) errs.experienceYears = 'Experience must be 0–60 years.';
    }
    if (step === 1) {
      if (!tutor.subjects.length) errs.subjects = 'Select at least one subject.';
      if (!tutor.examContext) errs.examContext = 'Please select an exam context.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Save current step to API ─────────────────────────────────────────────────
  const saveStep = async () => {
    setGlobalError('');
    if (isStudent) {
      const payloads = [
        { name: student.name, dateOfBirth: student.dateOfBirth, gender: student.gender, profileImageUrl: student.profileImageUrl || undefined },
        { studentClass: student.studentClass, schoolCollegeName: student.schoolCollegeName || undefined },
        { targetExam: student.targetExam },
        { expectedExamYear: Number(student.expectedExamYear), expectedExamMonth: Number(student.expectedExamMonth), targetScore: Number(student.targetScore) },
        { dailyQuestionGoal: Number(student.dailyQuestionGoal), studyMode: student.studyMode, prefEasy: student.prefEasy, prefMedium: student.prefMedium, prefHard: student.prefHard },
      ];
      const apiStep = step + 1; // API is 1-indexed
      const { data } = await patchStudentStep(apiStep, payloads[step]);
      // Update local profile with returned onboardingStep
      if (data) updateProfile({ onboardingStep: data.onboardingStep ?? apiStep, onboardingCompleted: data.onboardingCompleted ?? false });
    } else {
      const payloads = [
        { name: tutor.name, bio: tutor.bio || undefined, profileImageUrl: tutor.profileImageUrl || undefined, experienceYears: Number(tutor.experienceYears) },
        { subjects: tutor.subjects, examContext: tutor.examContext, specialization: tutor.specialization || undefined },
        { tutorPublicProfile: tutor.tutorPublicProfile, tutorBio: tutor.tutorBio || undefined },
      ];
      const apiStep = step + 1;
      const { data } = await patchTutorStep(apiStep, payloads[step]);
      if (data) updateProfile({ onboardingStep: data.onboardingStep ?? apiStep, onboardingCompleted: data.onboardingCompleted ?? false });
    }
  };

  // ── Navigate forward ─────────────────────────────────────────────────────────
  const handleNext = async () => {
    const valid = isStudent ? validateStudentStep() : validateTutorStep();
    if (!valid) return;
    setSaving(true);
    try {
      await saveStep();
      const isLastStep = step === STEPS.length - 1;
      if (isLastStep) {
        updateProfile({ onboardingCompleted: true });
        navigate(isStudent ? '/dashboard' : '/teacher', { replace: true });
      } else {
        setStep(s => s + 1);
      }
    } catch (err) {
      if (err.fieldErrors && Object.keys(err.fieldErrors).length) {
        setFieldErrors(err.fieldErrors);
      } else {
        setGlobalError(err.serverMessage || err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Loading state ────────────────────────────────────────────────────────────
  if (loadingState) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm text-muted-foreground">Loading your profile…</p>
        </div>
      </div>
    );
  }

  // ── Shared chrome ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-10">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={18} className="text-white" />
        </div>
        <span className="text-xl font-heading font-bold text-foreground">BioBridge</span>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-smooth ${
                i < step  ? 'bg-primary border-primary text-white' :
                i === step ? 'border-primary text-primary bg-primary/10' :
                             'border-border text-muted-foreground'
              }`}>
                {i < step ? <Icon name="Check" size={13} /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px mx-2 mb-5 transition-all w-10 md:w-16 ${i < step ? 'bg-primary' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">

        {/* Global error banner */}
        {globalError && (
          <div className="mb-5 p-3 bg-[#F87171]/10 border border-[#F87171]/25 rounded-xl text-xs text-[#F87171] flex items-center gap-2">
            <Icon name="AlertCircle" size={13} />
            {globalError}
          </div>
        )}

        {/* ══ STUDENT WIZARD ══════════════════════════════════════════════════ */}
        {isStudent && (
          <>
            {/* Step 1 — Personal Details */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Personal details</h2>
                <p className="text-sm text-muted-foreground mb-6">Tell us a bit about yourself.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full name <span className="text-[#F87171]">*</span></label>
                    <input value={student.name} onChange={e => setS('name', e.target.value)}
                      placeholder="Arjun Mehta"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                    <FieldError msg={fieldErr(fieldErrors, 'name')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Date of birth <span className="text-[#F87171]">*</span></label>
                    <input type="date" value={student.dateOfBirth} onChange={e => setS('dateOfBirth', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                    <FieldError msg={fieldErr(fieldErrors, 'dateOfBirth')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Gender <span className="text-[#F87171]">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {GENDER_OPTIONS.map(g => (
                        <button key={g.val} onClick={() => setS('gender', g.val)}
                          className={`px-3 py-2.5 rounded-xl border text-sm font-medium transition-smooth ${
                            student.gender === g.val ? 'border-primary bg-primary/8 text-primary' : 'border-border bg-secondary text-foreground hover:border-border-strong'
                          }`}>
                          {g.label}
                        </button>
                      ))}
                    </div>
                    <FieldError msg={fieldErr(fieldErrors, 'gender')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Profile image URL <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                    <input value={student.profileImageUrl} onChange={e => setS('profileImageUrl', e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 — Academic Details */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Academic details</h2>
                <p className="text-sm text-muted-foreground mb-6">Calibrates question difficulty and syllabus coverage.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Current class <span className="text-[#F87171]">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {CLASS_OPTIONS.map(c => (
                        <button key={c.val} onClick={() => setS('studentClass', c.val)}
                          className={`p-3.5 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                            student.studentClass === c.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                          }`}>
                          <div className={`font-semibold text-sm ${student.studentClass === c.val ? 'text-primary' : 'text-foreground'}`}>{c.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                    <FieldError msg={fieldErr(fieldErrors, 'studentClass')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">School / College name <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                    <input value={student.schoolCollegeName} onChange={e => setS('schoolCollegeName', e.target.value)}
                      maxLength={255} placeholder="Green Valley High School"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — Target Exam */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Target exam</h2>
                <p className="text-sm text-muted-foreground mb-6">Sets your subjects, syllabus, and leaderboard scope.</p>
                <div className="space-y-3">
                  {EXAM_OPTIONS.map(e => (
                    <button key={e.val} onClick={() => setS('targetExam', e.val)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                        student.targetExam === e.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                      }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${student.targetExam === e.val ? 'bg-primary/15' : 'bg-background'}`}>
                        <Icon name={e.icon} size={20} className={student.targetExam === e.val ? 'text-primary' : 'text-muted-foreground'} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground text-sm">{e.label}</div>
                        <div className="text-xs text-muted-foreground">{e.desc}</div>
                      </div>
                      {student.targetExam === e.val && <Icon name="CheckCircle" size={18} className="text-primary" />}
                    </button>
                  ))}
                </div>
                <FieldError msg={fieldErr(fieldErrors, 'targetExam')} />
              </div>
            )}

            {/* Step 4 — Exam Timeline */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Exam timeline</h2>
                <p className="text-sm text-muted-foreground mb-6">Helps us calibrate your preparation pace.</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Expected year</label>
                      <input type="number" value={student.expectedExamYear}
                        onChange={e => setS('expectedExamYear', Number(e.target.value))}
                        min={CURRENT_YEAR} max={CURRENT_YEAR + 5}
                        className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                      <FieldError msg={fieldErr(fieldErrors, 'expectedExamYear')} />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Month (1–12)</label>
                      <input type="number" value={student.expectedExamMonth}
                        onChange={e => setS('expectedExamMonth', Number(e.target.value))}
                        min={1} max={12}
                        className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                      <FieldError msg={fieldErr(fieldErrors, 'expectedExamMonth')} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Target score
                      <span className="text-muted-foreground text-xs font-normal ml-1">(max {maxScore} for {student.targetExam || 'your exam'})</span>
                    </label>
                    <input type="number" value={student.targetScore}
                      onChange={e => setS('targetScore', Number(e.target.value))}
                      min={0} max={maxScore}
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                    <FieldError msg={fieldErr(fieldErrors, 'targetScore')} />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5 — Practice Preferences */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Practice preferences</h2>
                <p className="text-sm text-muted-foreground mb-6">Customise how your daily questions are selected.</p>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Daily question goal <span className="text-muted-foreground text-xs font-normal">(1–100)</span>
                    </label>
                    <input type="number" value={student.dailyQuestionGoal}
                      onChange={e => setS('dailyQuestionGoal', Number(e.target.value))}
                      min={1} max={100}
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                    <FieldError msg={fieldErr(fieldErrors, 'dailyQuestionGoal')} />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Study mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {STUDY_MODE_OPTIONS.map(m => (
                        <button key={m.val} onClick={() => setS('studyMode', m.val)}
                          className={`p-3.5 rounded-xl border text-left transition-smooth hover:scale-[1.01] ${
                            student.studyMode === m.val ? 'border-primary bg-primary/8' : 'border-border bg-secondary hover:border-border-strong'
                          }`}>
                          <Icon name={m.icon} size={16} className={student.studyMode === m.val ? 'text-primary mb-1.5' : 'text-muted-foreground mb-1.5'} />
                          <div className={`font-semibold text-xs ${student.studyMode === m.val ? 'text-primary' : 'text-foreground'}`}>{m.title}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{m.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-foreground">Difficulty mix</label>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                        student.prefEasy + student.prefMedium + student.prefHard === 100
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-[#F87171]/10 text-[#F87171]'
                      }`}>
                        {student.prefEasy + student.prefMedium + student.prefHard} / 100
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { key: 'prefEasy',   label: 'Easy',   color: 'text-emerald-400' },
                        { key: 'prefMedium', label: 'Medium', color: 'text-amber-400' },
                        { key: 'prefHard',   label: 'Hard',   color: 'text-[#F87171]' },
                      ].map(({ key, label, color }) => (
                        <div key={key}>
                          <label className={`text-xs font-semibold ${color} block mb-1.5`}>{label} %</label>
                          <input type="number" value={student[key]}
                            onChange={e => setS(key, Math.max(0, Math.min(100, Number(e.target.value))))}
                            min={0} max={100}
                            className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm text-center" />
                        </div>
                      ))}
                    </div>
                    <FieldError msg={fieldErr(fieldErrors, 'prefMix')} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ TUTOR WIZARD ════════════════════════════════════════════════════ */}
        {isTutor && (
          <>
            {/* Tutor Step 1 — Profile Info */}
            {step === 0 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Profile info</h2>
                <p className="text-sm text-muted-foreground mb-6">Help students find and trust you.</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full name <span className="text-[#F87171]">*</span></label>
                    <input value={tutor.name} onChange={e => setT('name', e.target.value)}
                      placeholder="Dr. Sarah Paul"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                    <FieldError msg={fieldErr(fieldErrors, 'name')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Bio <span className="text-muted-foreground text-xs font-normal">(optional, max 2000 chars)</span></label>
                    <textarea value={tutor.bio} onChange={e => setT('bio', e.target.value)}
                      maxLength={2000} rows={3} placeholder="Specialist in organic chemistry…"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm resize-none" />
                    <FieldError msg={fieldErr(fieldErrors, 'bio')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Profile image URL <span className="text-muted-foreground text-xs font-normal">(optional)</span></label>
                    <input value={tutor.profileImageUrl} onChange={e => setT('profileImageUrl', e.target.value)}
                      placeholder="https://example.com/tutor.jpg"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Years of experience</label>
                    <input type="number" value={tutor.experienceYears}
                      onChange={e => setT('experienceYears', Number(e.target.value))}
                      min={0} max={60}
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                    <FieldError msg={fieldErr(fieldErrors, 'experienceYears')} />
                  </div>
                </div>
              </div>
            )}

            {/* Tutor Step 2 — Subjects & Specialization */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Subjects &amp; specialization</h2>
                <p className="text-sm text-muted-foreground mb-6">Controls which questions you can upload and assign.</p>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Exam context <span className="text-[#F87171]">*</span></label>
                    <div className="grid grid-cols-2 gap-2">
                      {EXAM_OPTIONS.map(e => (
                        <button key={e.val} onClick={() => { setT('examContext', e.val); setT('subjects', []); }}
                          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-smooth ${
                            tutor.examContext === e.val ? 'border-primary bg-primary/8 text-primary' : 'border-border bg-secondary text-foreground hover:border-border-strong'
                          }`}>
                          <Icon name={e.icon} size={15} />
                          {e.label}
                        </button>
                      ))}
                    </div>
                    <FieldError msg={fieldErr(fieldErrors, 'examContext')} />
                  </div>

                  {tutor.examContext && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Subjects <span className="text-[#F87171]">*</span>
                        <span className="text-muted-foreground text-xs font-normal ml-1">({tutor.subjects.length} selected)</span>
                      </label>
                      <div className={`grid gap-2 ${EXAM_CONTEXT_SUBJECTS[tutor.examContext]?.length > 6 ? 'grid-cols-2' : 'grid-cols-2'}`}>
                        {(EXAM_CONTEXT_SUBJECTS[tutor.examContext] || []).map(s => (
                          <button key={s} onClick={() => toggleSubject(s)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl border text-sm transition-smooth ${
                              tutor.subjects.includes(s) ? 'border-primary bg-primary/8 text-primary' : 'border-border bg-secondary text-foreground hover:border-border-strong'
                            }`}>
                            <span className="truncate">{s}</span>
                            {tutor.subjects.includes(s) && <Icon name="Check" size={13} className="flex-shrink-0 ml-1" />}
                          </button>
                        ))}
                      </div>
                      <FieldError msg={fieldErr(fieldErrors, 'subjects')} />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Specialization <span className="text-muted-foreground text-xs font-normal">(optional, max 255 chars)</span></label>
                    <input value={tutor.specialization} onChange={e => setT('specialization', e.target.value)}
                      maxLength={255} placeholder="Medical Academy Lead"
                      className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm" />
                  </div>
                </div>
              </div>
            )}

            {/* Tutor Step 3 — Settings & Completion */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-1">Public profile settings</h2>
                <p className="text-sm text-muted-foreground mb-6">Control how you appear to students on BioBridge.</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary border border-border rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-foreground">Make profile public</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Students can discover and follow your profile</p>
                    </div>
                    <button onClick={() => setT('tutorPublicProfile', !tutor.tutorPublicProfile)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${tutor.tutorPublicProfile ? 'bg-primary' : 'bg-border'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${tutor.tutorPublicProfile ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  {tutor.tutorPublicProfile && (
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Extended public bio <span className="text-muted-foreground text-xs font-normal">(optional, max 2000 chars)</span></label>
                      <textarea value={tutor.tutorBio} onChange={e => setT('tutorBio', e.target.value)}
                        maxLength={2000} rows={4} placeholder="Extended public profile details…"
                        className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-primary transition-smooth text-sm resize-none" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* Unknown role fallback */}
        {!isStudent && !isTutor && (
          <div className="text-center py-8">
            <Icon name="AlertCircle" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">Role not supported in this wizard.</p>
            <p className="text-sm text-muted-foreground mt-1">Please contact support if this is unexpected.</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button variant="ghost" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0 || saving} iconName="ArrowLeft" iconPosition="left" size="sm">
            Back
          </Button>
          <span className="text-xs text-muted-foreground">{step + 1} / {STEPS.length}</span>
          <Button
            onClick={handleNext}
            disabled={saving}
            loading={saving}
            iconName={step === STEPS.length - 1 ? 'Zap' : 'ArrowRight'}
            iconPosition="right"
            size="sm"
          >
            {step === STEPS.length - 1 ? 'Finish setup' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
