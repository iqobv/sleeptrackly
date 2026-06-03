import { getAllSessions } from '@/api';

export type Session = Awaited<ReturnType<typeof getAllSessions>>[number];
