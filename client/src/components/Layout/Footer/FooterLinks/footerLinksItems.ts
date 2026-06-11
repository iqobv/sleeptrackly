import { PAGES } from '@/config/pages.config';

interface FooterLink {
	href: string;
	label: string;
}

export const FOOTER_LINKS: FooterLink[] = [
	{
		href: PAGES.TERMS_AND_CONDITIONS,
		label: 'Terms and Conditions',
	},
	{
		href: PAGES.PRIVACY_POLICY,
		label: 'Privacy Policy',
	},
	{
		href: PAGES.COOKIES,
		label: 'Cookie Policy',
	},
];
