import { AllChallengeTemplates } from '@/components/Challenge/Templates/AllChallengeTemplates/AllChallengeTemplates';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Challenge Templates',
};

export default function ChallengeTemplatesPage() {
	return <AllChallengeTemplates />;
}
