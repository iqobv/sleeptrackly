import { LegalContent } from '@/components/Layout/LegalContent/LegalContent';
import { PRIVACY_POLICY_HTML } from '@/constants/legal/privacyPolicy.constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
};

export default function PrivacyPollicyPage() {
	return <LegalContent html={PRIVACY_POLICY_HTML} />;
}
