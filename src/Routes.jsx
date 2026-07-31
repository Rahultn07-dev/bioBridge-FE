import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";

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

// Institution portal
import InstitutionDashboard from './pages/institution-dashboard';
import InstitutionBatches from './pages/institution-batches';
import InstitutionTeachers from './pages/institution-teachers';
import InstitutionStudents from './pages/institution-students';
import InstitutionMaterials from './pages/institution-materials';
import InstitutionQuestions from './pages/institution-questions';
import InstitutionAnalytics from './pages/institution-analytics';
import InstitutionSettings from './pages/institution-settings';

// Utility pages
import Settings from './pages/settings';
import MonthlyReport from './pages/monthly-report';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Student core */}
        <Route path="/activity-dashboard" element={<ActivityDashboard />} />
        <Route path="/dashboard" element={<ActivityDashboard />} />
        <Route path="/practice-lab" element={<PracticeLab />} />
        {/* POD lives on dashboard — /pod redirects there */}
        <Route path="/pod" element={<ActivityDashboard />} />
        <Route path="/review" element={<MistakeReview />} />
        <Route path="/concept-mastery-heatmap" element={<ConceptMasteryHeatmap />} />
        <Route path="/doubt-solver" element={<DoubtSolver />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Practice session flow */}
        <Route path="/practice/session/:sessionId/justify" element={<SessionJustify />} />
        <Route path="/practice/session/:sessionId/report" element={<SessionReport />} />

        {/* Contests / Tests */}
        <Route path="/contest-hub" element={<ContestHub />} />
        <Route path="/contests/:id/take" element={<TestTaking />} />
        <Route path="/contests/:id/justify" element={<SessionJustify />} />
        <Route path="/contests/:id/result" element={<TestResult />} />

        {/* Adaptive learning */}
        <Route path="/study/:tag" element={<ConceptStudy />} />

        {/* Community */}
        <Route path="/articles" element={<ArticlesFeed />} />
        <Route path="/articles/create" element={<ArticleCreate />} />
        <Route path="/articles/:slug" element={<ArticleDetail />} />

        {/* Teacher portal */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/students/:id" element={<TeacherStudentDetail />} />
        <Route path="/teacher/questions" element={<TeacherQuestions />} />
        <Route path="/teacher/pod" element={<TeacherPOD />} />
        <Route path="/teacher/materials" element={<TeacherMaterials />} />
        <Route path="/teacher/batch" element={<TeacherBatch />} />
        <Route path="/teacher/doubts" element={<TeacherDoubts />} />

        {/* Institution portal */}
        <Route path="/institution" element={<InstitutionDashboard />} />
        <Route path="/institution/batches" element={<InstitutionBatches />} />
        <Route path="/institution/teachers" element={<InstitutionTeachers />} />
        <Route path="/institution/students" element={<InstitutionStudents />} />
        <Route path="/institution/materials" element={<InstitutionMaterials />} />
        <Route path="/institution/questions" element={<InstitutionQuestions />} />
        <Route path="/institution/analytics" element={<InstitutionAnalytics />} />
        <Route path="/institution/settings" element={<InstitutionSettings />} />

        {/* Utility */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports/:month" element={<MonthlyReport />} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
