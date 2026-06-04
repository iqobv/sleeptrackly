import { getProfile } from '@/api';

export type Profile = Awaited<ReturnType<typeof getProfile>>;
export type ProfileStatistics = Profile['statistics'];
