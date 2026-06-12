import { getUser } from '@/api/auth/auth.api';

export type User = Awaited<ReturnType<typeof getUser>>;
