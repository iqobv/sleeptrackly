import { LegalContent } from '@/components/Layout/LegalContent/LegalContent';
import { PRIVACY_POLICY_HTML } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
};

export default function Page() {
	return <LegalContent html={PRIVACY_POLICY_HTML} />;
}
