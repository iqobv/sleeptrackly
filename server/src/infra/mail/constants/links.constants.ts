export const EmailLink = {
	emailConfirmation: '/email-confirmation',
	resetPassword: '/reset-password',
	restoreAccount: '/restore-account',
} as const;

export type EmailLink = (typeof EmailLink)[keyof typeof EmailLink];
