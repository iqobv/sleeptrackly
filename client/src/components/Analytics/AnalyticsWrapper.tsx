'use client';

import { env } from '@/env';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { useEffect, useState } from 'react';
import { acceptedCategory } from 'vanilla-cookieconsent';
import { runCookieConsent } from './cookieConfig';

const gaId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const AnalyticsWrapper = () => {
	const [hasGAConsent, setHasGAConsent] = useState(false);

	useEffect(() => {
		runCookieConsent();

		if (acceptedCategory('analytics')) setHasGAConsent(true);

		const handleConsent = () => {
			if (acceptedCategory('analytics')) setHasGAConsent(true);
		};

		const handleChange = () => setHasGAConsent(acceptedCategory('analytics'));

		window.addEventListener('cc:onConsent', handleConsent);
		window.addEventListener('cc:onChange', handleChange);

		return () => {
			window.removeEventListener('cc:onConsent', handleConsent);
			window.removeEventListener('cc:onChange', handleChange);
		};
	}, []);

	return (
		<>
			<VercelAnalytics />
			{hasGAConsent && <GoogleAnalytics gaId={gaId} />}
		</>
	);
};
