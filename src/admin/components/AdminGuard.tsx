// src/admin/components/AdminGuard.tsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../store/authStore';

interface Props {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: Props) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return <>{children}</>;
}
