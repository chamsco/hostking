/**
 * Main Application Component
 * 
 * This is the root component of the application that sets up:
 * - React Router for client-side routing
 * - React Query for server state management
 * - Theme provider for dark/light mode
 * - Authentication context for user session management
 * - Protected routes and layouts
 * - Error boundaries for graceful error handling
 */
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { Dashboard } from '@/pages/Dashboard';
import { Projects } from '@/pages/Projects';
import { ProjectCreate } from '@/pages/ProjectCreate';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { ProjectResources } from '@/pages/ProjectResources';
import Settings from '@/pages/Settings';
import ErrorBoundary from '@/components/ErrorBoundary';
import AuthErrorBoundary from '@/components/auth/AuthErrorBoundary';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';

/**
 * Root App Component
 * 
 * This is the root component of the application:
 * - Provides error boundaries for error handling
 * - Provides toast notifications for feedback
 * - Provides theme provider for styling
 * - Provides authentication context for user management
 * - Provides projects context for project management
 */
export function App() {
  return (
    <ErrorBoundary>
      <AuthErrorBoundary>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-background">
                    <div className="container py-4">
                      <Outlet />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/create" element={<ProjectCreate />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/projects/:projectId/resources" element={<ProjectResources />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
        <Toaster />
      </AuthErrorBoundary>
    </ErrorBoundary>
  );
} 