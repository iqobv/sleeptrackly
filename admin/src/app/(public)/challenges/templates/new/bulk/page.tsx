import { BulkCreateChallengeTemplates } from '@/components/Challenge/Templates/BulkCreateChallengeTemplates/BulkCreateChallengeTemplates';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Bulk Create Challenge Templates',
};

export default function BulkCreateChallengeTemplatesPage() {
	return <BulkCreateChallengeTemplates />;
}
