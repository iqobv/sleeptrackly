import { ChallengeType } from '@/types/challenge/challengeType.types';

export type MetadataDefaultMap<
	TDto extends { type: ChallengeType },
	TMetadataKey extends keyof Extract<TDto, { type: ChallengeType }>,
> = {
	[K in ChallengeType]: TMetadataKey extends keyof Extract<TDto, { type: K }>
		? Extract<TDto, { type: K }>[TMetadataKey]
		: never;
};
