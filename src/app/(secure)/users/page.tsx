'use client';

import { ListUsers } from '@/components/users/ListUsers';
import { useListUsers } from '@/helpers/client/hooks/users/useListUsers';

export default function ListUsersPage() {
  const props = useListUsers();

  return <ListUsers {...props} />;
}
