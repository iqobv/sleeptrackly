import { getProfile } from '@/api/profile/profile.api';

export type Profile = Awaited<ReturnType<typeof getProfile>>;
export type ProfileStatistics = Profile['statistics'];
