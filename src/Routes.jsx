import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import JoinBatch from "./pages/join";

// Existing pages
import PracticeLab from './pages/practice-lab';
import Login from './pages/login';
import ConceptMasteryHeatmap from './pages/concept-mastery-heat';
import ActivityDashboard from './pages/activity-dashboard';
import DoubtSolver from './pages/doubt-solver';
import Register from './pages/register';
import ContestHub from './pages/contest-hub';
import Leaderboard from './pages/leaderboard';
import UserProfile from './pages/user-profile';

// New pages
import LandingPage from './pages/landing';
import Onboarding from './pages/onboarding';
import POD from './pages/pod';
import MistakeReview from './pages/mistake-review';
import SessionJustify from './pages/session-justify';
import SessionReport from './pages/session-report';
import TestTaking from './pages/test-taking';
import TestResult from './pages/test-result';
import Notifications from './pages/notifications';
import ArticlesFeed from './pages/articles';
import ArticleDetail from './pages/article-detail';
import ArticleCreate from './pages/article-create';
import ConceptStudy from './pages/concept-study';

// Teacher portal
import TeacherDashboard from './pages/teacher-dashboard';
import TeacherStudents from './pages/teacher-students';
import TeacherStudentDetail from './pages/teacher-student-detail';
import TeacherQuestions from './pages/teacher-questions';
import TeacherPOD from './pages/teacher-pod';
import TeacherMaterials from './pages/teacher-materials';
import TeacherBatch from './pages/teacher-batch';
import TeacherDoubts from './pages/teacher-doubts';
import TeacherExplanations from './pages/teacher-explanations';

// Institution Teacher portal (separate from independent tutor)
import InstitutionTeacherDashboard from './pages/institution-teacher-dashboard';
import InstitutionTeacherStudents from './pages/institution-teacher-students';
import InstitutionTeacherDoubts from './pages/institution-teacher-doubts';
import InstitutionTeacherQuestions from './pages/institution-teacher-questions';
import InstitutionTeacherPOD from './pages/institution-teacher-pod';
import InstitutionTeacherExplanations from './pages/institution-teacher-explanations';

// Institution portal
import InstitutionDashboard from './pages/institution-dashboard';
import InstitutionBatches from './pages/institution-batches';
import InstitutionTeachers from './pages/institution-teachers';
import InstitutionStudents from './pages/institution-students';
import InstitutionMaterials from './pages/institution-materials';
import InstitutionQuestions from './pages/institution-questions';
import InstitutionAnalytics from './pages/institution-analytics';
import InstitutionSettings from './pages/institution-settings';
import InstitutionDoubts from './pages/institution-doubts';

// Utility pages
import Settings from './pages/settings';
import Achievements from './pages/achievements';
import MonthlyReport from './pages/monthly-report';

const Routes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/join" element={<JoinBatch />} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />

        {/* Student core */}
        <Route path="/activity-dashboard" element={<ProtectedRoute allowedRoles={['STUDENT']}><ActivityDashboard /></ProtectedRoute>} />
        <Route path="/dashboard"          element={<ProtectedRoute allowedRoles={['STUDENT']}><ActivityDashboard /></ProtectedRoute>} />
        <Route path="/practice-lab"       element={<ProtectedRoute allowedRoles={['STUDENT']}><PracticeLab /></ProtectedRoute>} />
        <Route path="/pod"                element={<ProtectedRoute allowedRoles={['STUDENT']}><ActivityDashboard /></ProtectedRoute>} />
        <Route path="/review"             element={<ProtectedRoute allowedRoles={['STUDENT']}><MistakeReview /></ProtectedRoute>} />
        <Route path="/concept-mastery-heatmap" element={<ProtectedRoute allowedRoles={['STUDENT']}><ConceptMasteryHeatmap /></ProtectedRoute>} />
        <Route path="/doubt-solver"       element={<ProtectedRoute allowedRoles={['STUDENT']}><DoubtSolver /></ProtectedRoute>} />
        <Route path="/leaderboard"        element={<ProtectedRoute allowedRoles={['STUDENT']}><Leaderboard /></ProtectedRoute>} />
        <Route path="/achievements"       element={<ProtectedRoute allowedRoles={['STUDENT']}><Achievements /></ProtectedRoute>} />
        <Route path="/user-profile"       element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/notifications"      element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

        {/* Practice session flow */}
        <Route path="/practice/session/:sessionId/justify" element={<ProtectedRoute allowedRoles={['STUDENT']}><SessionJustify /></ProtectedRoute>} />
        <Route path="/practice/session/:sessionId/report"  element={<ProtectedRoute allowedRoles={['STUDENT']}><SessionReport /></ProtectedRoute>} />

        {/* Contests / Tests */}
        <Route path="/contest-hub"          element={<ProtectedRoute allowedRoles={['STUDENT']}><ContestHub /></ProtectedRoute>} />
        <Route path="/contests/:id/take"    element={<ProtectedRoute allowedRoles={['STUDENT']}><TestTaking /></ProtectedRoute>} />
        <Route path="/contests/:id/justify" element={<ProtectedRoute allowedRoles={['STUDENT']}><SessionJustify /></ProtectedRoute>} />
        <Route path="/contests/:id/result"  element={<ProtectedRoute allowedRoles={['STUDENT']}><TestResult /></ProtectedRoute>} />

        {/* Adaptive learning */}
        <Route path="/study/:tag" element={<ProtectedRoute allowedRoles={['STUDENT']}><ConceptStudy /></ProtectedRoute>} />

        {/* Community */}
        <Route path="/articles"        element={<ProtectedRoute><ArticlesFeed /></ProtectedRoute>} />
        <Route path="/articles/create" element={<ProtectedRoute><ArticleCreate /></ProtectedRoute>} />
        <Route path="/articles/:slug"  element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>} />

        {/* Institution Teacher portal */}
        <Route path="/institution-teacher"              element={<ProtectedRoute allowedRoles={['INSTITUTION_TEACHER']}><InstitutionTeacherDashboard /></ProtectedRoute>} />
        <Route path="/institution-teacher/students"     element={<ProtectedRoute allowedRoles={['INSTITUTION_TEACHER']}><InstitutionTeacherStudents /></ProtectedRoute>} />
        <Route path="/institution-teacher/doubts"       element={<ProtectedRoute allowedRoles={['INSTITUTION_TEACHER']}><InstitutionTeacherDoubts /></ProtectedRoute>} />
        <Route path="/institution-teacher/questions"    element={<ProtectedRoute allowedRoles={['INSTITUTION_TEACHER']}><InstitutionTeacherQuestions /></ProtectedRoute>} />
        <Route path="/institution-teacher/pod"          element={<ProtectedRoute allowedRoles={['INSTITUTION_TEACHER']}><InstitutionTeacherPOD /></ProtectedRoute>} />
        <Route path="/institution-teacher/explanations" element={<ProtectedRoute allowedRoles={['INSTITUTION_TEACHER']}><InstitutionTeacherExplanations /></ProtectedRoute>} />

        {/* Independent Tutor portal */}
        <Route path="/teacher"                element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherDashboard /></ProtectedRoute>} />
        <Route path="/teacher/students"       element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherStudents /></ProtectedRoute>} />
        <Route path="/teacher/students/:id"   element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherStudentDetail /></ProtectedRoute>} />
        <Route path="/teacher/questions"      element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherQuestions /></ProtectedRoute>} />
        <Route path="/teacher/pod"            element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherPOD /></ProtectedRoute>} />
        <Route path="/teacher/materials"      element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherMaterials /></ProtectedRoute>} />
        <Route path="/teacher/batch"          element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherBatch /></ProtectedRoute>} />
        <Route path="/teacher/doubts"         element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherDoubts /></ProtectedRoute>} />
        <Route path="/teacher/explanations"   element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherExplanations /></ProtectedRoute>} />

        {/* Institution portal */}
        <Route path="/institution"           element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionDashboard /></ProtectedRoute>} />
        <Route path="/institution/batches"   element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionBatches /></ProtectedRoute>} />
        <Route path="/institution/teachers"  element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionTeachers /></ProtectedRoute>} />
        <Route path="/institution/students"  element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionStudents /></ProtectedRoute>} />
        <Route path="/institution/materials" element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionMaterials /></ProtectedRoute>} />
        <Route path="/institution/questions" element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionQuestions /></ProtectedRoute>} />
        <Route path="/institution/analytics" element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionAnalytics /></ProtectedRoute>} />
        <Route path="/institution/doubts"    element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionDoubts /></ProtectedRoute>} />
        <Route path="/institution/settings"  element={<ProtectedRoute allowedRoles={['INSTITUTION']}><InstitutionSettings /></ProtectedRoute>} />

        {/* Utility */}
        <Route path="/settings"        element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/reports/:month"  element={<ProtectedRoute><MonthlyReport /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </ErrorBoundary>
  );
};

export default Routes;
