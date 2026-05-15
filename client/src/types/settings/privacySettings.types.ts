import { PrivacyVisibility } from './privacyVisibility.types';

export interface PrivacySettings {
	id: string;
	userId: string;
	acceptFriendRequests: boolean;
	showActivity: boolean;
	profileVisibility: PrivacyVisibility;
	achievementsVisibility: PrivacyVisibility;
	statisticsVisibility: PrivacyVisibility;
	createdAt: Date;
	updatedAt: Date;
}
