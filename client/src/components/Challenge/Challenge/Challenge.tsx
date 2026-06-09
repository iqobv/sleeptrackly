'use client';

import { getChallengeById } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { Calendar } from '../Calendar';
import { ChallengeInfo } from '../ChallengeInfo';
import { ChallengeSummary } from '../ChallengeSummary';
import { ChallengeLoader } from './ChallengeLoader';

interface ChallengeProps {
	id: string;
}

export const Challenge = ({ id }: ChallengeProps) => {
	const { data: challenge, isLoading } = useQuery({
		queryKey: QUERY_KEYS.challenges.one(id),
		queryFn: () => getChallengeById(id),
		enabled: !!id,
	});

	if (isLoading) return <ChallengeLoader />;
	if (!challenge) notFound();

	return (
		<>
			<ChallengeSummary data={challenge} />
			<Calendar data={challenge} mode={challenge.frequency} />
			<ChallengeInfo data={challenge} />
		</>
	);
};
