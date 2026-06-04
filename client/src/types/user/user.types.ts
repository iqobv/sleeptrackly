import { getUser, searchByUsername } from '@/api';

export type User = Awaited<ReturnType<typeof getUser>>;
export type SearchUser = Awaited<ReturnType<typeof searchByUsername>>[number];
