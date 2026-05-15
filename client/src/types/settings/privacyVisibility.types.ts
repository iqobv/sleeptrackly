import { PRIVACY_VISIBILITY } from '@/constants';

export type PrivacyVisibility =
	(typeof PRIVACY_VISIBILITY)[keyof typeof PRIVACY_VISIBILITY];
