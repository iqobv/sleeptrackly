import { EditChallengeTemplate } from '@/components/Challenge/Templates/EditChallengeTemplate/EditChallengeTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenge Template',
};

export default function ChallengeTemplatePage() {
	return <EditChallengeTemplate />;
}
