import { EditChallenge } from '@/components/Challenge/All/EditChallenge/EditChallenge';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenge',
};

export default function ChallengePage() {
	return <EditChallenge />;
}
