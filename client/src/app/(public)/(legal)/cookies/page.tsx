import { LegalContent } from '@/components/Layout/LegalContent/LegalContent';
import { COOKIES_POLICY_HTML } from '@/constants';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Cookies Policy',
};

export default function CookiesPolicyPage() {
	return (
		<Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
			<LegalContent html={COOKIES_POLICY_HTML} />
		</Suspense>
	);
}
