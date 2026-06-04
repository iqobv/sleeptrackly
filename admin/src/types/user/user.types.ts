import { getUser } from '@/api';

export type User = Awaited<ReturnType<typeof getUser>>;
