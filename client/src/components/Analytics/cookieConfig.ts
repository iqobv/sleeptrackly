import { CROSS_DOMAIN_ROUTES } from '@/config/navigation.config';
import { env } from '@/env';
import { run } from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';

export const runCookieConsent = () => {
	const isProd = env.NODE_ENV === 'production';

	run({
		guiOptions: {
			consentModal: {
				layout: 'box',
				position: 'bottom right',
				equalWeightButtons: true,
				flipButtons: false,
			},
			preferencesModal: {
				layout: 'box',
				position: 'right',
				equalWeightButtons: true,
				flipButtons: false,
			},
		},
		cookie: {
			name: 'cc_cookie',
			expiresAfterDays: 365,
			sameSite: 'Lax',
			path: '/',
			domain: isProd
				? `.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
				: window.location.hostname,
		},
		categories: {
			necessary: { readOnly: true, enabled: true },
			analytics: {
				autoClear: {
					cookies: [{ name: /^_ga/ }, { name: '_gid' }],
				},
			},
		},
		language: {
			default: 'en',
			translations: {
				en: {
					consentModal: {
						title: 'We use cookies',
						description: `Sleeptrackly uses cookies to ensure our website operates effectively and to analyze site usage. Read our <a href=${CROSS_DOMAIN_ROUTES.PRIVACY_POLICY}>Privacy Policy</a>.`,
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						showPreferencesBtn: 'Manage preferences',
					},
					preferencesModal: {
						title: 'Cookie Preferences',
						acceptAllBtn: 'Accept all',
						acceptNecessaryBtn: 'Reject all',
						savePreferencesBtn: 'Save preferences',
						closeIconLabel: 'Close modal',
						sections: [
							{
								title: 'Strictly Necessary Cookies',
								description:
									'Required for technical reasons in order for our Website to operate.',
								linkedCategory: 'necessary',
								cookieTable: {
									headers: {
										name: 'Name',
										purpose: 'Purpose',
										duration: 'Expires',
									},
									body: [
										{
											name: 'session',
											purpose: 'Maintain active user session',
											duration: '30 days',
										},
									],
								},
							},
							{
								title: 'Analytics Cookies',
								description:
									'Helps us understand how our Website is being used by collecting information through Google Analytics.',
								linkedCategory: 'analytics',
							},
						],
					},
				},
			},
		},
	});
};
