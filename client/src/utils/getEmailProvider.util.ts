import {
	EmailProviderConfig,
	GLOBAL_EMAIL_PROVIDERS,
} from '@/config/emailProviders.config';

export const getEmailProvider = (email: string): EmailProviderConfig | null => {
	if (!email || !email.includes('@')) return null;

	const domain = email.split('@')[1].toLowerCase();

	return (
		GLOBAL_EMAIL_PROVIDERS.find((provider) =>
			provider.domains.includes(domain),
		) || null
	);
};
