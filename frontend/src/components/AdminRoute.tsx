/**
 * Admin Route Component
 * 
 * Higher-order component that protects admin-only routes by:
 * - Checking authentication status
 * - Verifying admin privileges
 * - Redirecting unauthorized users to dashboard
 * - Handling loading states during auth check
 * 
 * Example usage:
 * ```tsx
 * <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
 * ```
 */
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context';
import { LoadingScreen } from '@/components/LoadingScreen';

interface Props {
  children: ReactNode;
}

export default function AdminRoute({ children }: Props) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Checking authorization..." />;
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
} 