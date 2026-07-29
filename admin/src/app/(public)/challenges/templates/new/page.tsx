import { CreateChallengeTemplate } from '@/components/Challenge/Templates/CreateChallengeTemplate/CreateChallengeTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Challenge Template',
};

export default function NewChallengeTemplatePage() {
	return <CreateChallengeTemplate />;
}
