import { PRIVACY_VISIBILITY } from '@/constants';

export type TPrivacyVisibility =
	(typeof PRIVACY_VISIBILITY)[keyof typeof PRIVACY_VISIBILITY];
