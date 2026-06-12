import { getUser } from '@/api/auth/auth.api';
import { searchByUsername } from '@/api/user/user.api';

export type User = Awaited<ReturnType<typeof getUser>>;
export type SearchUser = Awaited<ReturnType<typeof searchByUsername>>[number];
