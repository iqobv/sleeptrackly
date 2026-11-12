import { IconType } from 'react-icons';
import { FaApple, FaGoogle, FaMicrosoft, FaYahoo } from 'react-icons/fa6';

export interface EmailProviderConfig {
	name: string;
	domains: string[];
	inboxUrl: string;
	Icon: IconType;
}

export const GLOBAL_EMAIL_PROVIDERS: EmailProviderConfig[] = [
	{
		name: 'Gmail',
		domains: ['gmail.com', 'googlemail.com'],
		inboxUrl: 'https://mail.google.com/',
		Icon: FaGoogle,
	},
	{
		name: 'Outlook',
		domains: [
			'outlook.com',
			'hotmail.com',
			'live.com',
			'msn.com',
			'passport.com',
		],
		inboxUrl: 'https://outlook.live.com/mail/0/inbox',
		Icon: FaMicrosoft,
	},
	{
		name: 'Yahoo',
		domains: ['yahoo.com', 'ymail.com', 'rocketmail.com'],
		inboxUrl: 'https://mail.yahoo.com/',
		Icon: FaYahoo,
	},
	{
		name: 'iCloud',
		domains: ['icloud.com', 'me.com', 'mac.com'],
		inboxUrl: 'https://www.icloud.com/mail',
		Icon: FaApple,
	},
];

