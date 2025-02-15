/**
 * Application Routes
 * 
 * Defines all routes in the application:
 * - Public routes (login, register)
 * - Protected routes (dashboard, projects)
 * - Admin-only routes (users)
 * - Nested routes (project details)
 * 
 * Each route is configured with:
 * - Path
 * - Element (component to render)
 * - Layout (optional wrapper component)
 * - Protection (auth/admin guards)
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProjectErrorBoundary } from '@/components/ProjectErrorBoundary';
import { AppProviders } from '@/providers';

import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Onboarding } from '@/pages/Onboarding';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import { Dashboard } from '@/pages/Dashboard';
import { Projects } from '@/pages/Projects';
import { Users } from '@/pages/Users';
import { Profile } from '@/pages/Profile';
import Settings from '@/pages/Settings';
import ProjectCreate from '@/pages/ProjectCreate';
import { ProjectSettings } from '@/pages/ProjectSettings';
import { ProjectResources } from '@/pages/ProjectResources';
import { Servers } from '@/pages/Servers';
import { ServerCreatePage } from '@/pages/ServerCreatePage';
import ProjectDetail from '@/pages/ProjectDetail';
import { NewResource } from '@/pages/NewResource';
import { GithubResource } from '@/features/resources/components/github-resource';
import { PrivateGitResource } from '@/features/resources/components/private-git-resource';
import { PublicGitResource } from '@/features/resources/components/public-git-resource';
import { DockerfileResource } from '@/features/resources/components/dockerfile-resource';
import { DockerComposeResource } from '@/features/resources/components/docker-compose-resource';
import { DockerImageResource } from '@/features/resources/components/docker-image-resource';

// Configure React Query client with custom defaults
// - Disable automatic retries on failed requests
// - Disable automatic refetching when window regains focus
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

// Create a layout component that wraps the DashboardLayout with AppProviders
function ProtectedLayout() {
  return (
    <AppProviders>
      <DashboardLayout />
    </AppProviders>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/register" replace />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    errorElement: <ProjectErrorBoundary />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'projects',
        element: <Projects />
      },
      {
        path: 'projects/:id',
        element: <ProjectDetail />
      },
      {
        path: 'projects/create',
        element: <ProjectCreate />
      },
      {
        path: 'projects/:id/settings',
        element: <ProjectSettings />
      },
      {
        path: 'projects/:projectId/resources',
        element: <ProjectResources />
      },
      {
        path: 'projects/:projectId/environments/:environmentId/new',
        children: [
          {
            index: true,
            element: <NewResource />
          },
          {
            path: 'public',
            element: <PublicGitResource />
          },
          {
            path: 'github',
            element: <GithubResource />
          },
          {
            path: 'private',
            element: <PrivateGitResource />
          },
          {
            path: 'dockerfile',
            element: <DockerfileResource />
          },
          {
            path: 'compose',
            element: <DockerComposeResource />
          },
          {
            path: 'image',
            element: <DockerImageResource />
          }
        ]
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'servers',
        element: <Servers />
      },
      {
        path: 'servers/create',
        element: <ServerCreatePage />
      }
    ]
  },
  {
    path: 'login',
    element: <AppProviders><Login /></AppProviders>
  },
  {
    path: 'register',
    element: <AppProviders><Register /></AppProviders>
  },
  {
    path: 'onboarding',
    element: <AppProviders><Onboarding /></AppProviders>
  },
  {
    path: 'forgot-password',
    element: <AppProviders><ForgotPassword /></AppProviders>
  },
  {
    path: 'reset-password',
    element: <AppProviders><ResetPassword /></AppProviders>
  }
]); 