'use client';

import { ChangePassword } from '@/components/auth/ChangePassword';
import { usePassword } from '@/helpers/client/hooks/auth/usePassword';

export default function ChangePasswordPage() {
  const props = usePassword();

  return <ChangePassword {...props} />;
}
