import { getAllSessions } from '@/api/auth/session.api';

export type Session = Awaited<ReturnType<typeof getAllSessions>>[number];
