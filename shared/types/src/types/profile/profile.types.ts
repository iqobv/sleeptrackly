import { paths } from '../../schema';

export type Profile =
	paths['/v1/profiles/{username}']['get']['responses']['200']['content']['application/json'];
export type ProfileStatistics = Profile['statistics'];
