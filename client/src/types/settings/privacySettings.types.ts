import { TPrivacyVisibility } from './privacyVisibility.types';

export interface IPrivacySettings {
	id: string;
	userId: string;
	acceptFriendRequests: boolean;
	showActivity: boolean;
	profileVisibility: TPrivacyVisibility;
	achievementsVisibility: TPrivacyVisibility;
	statisticsVisibility: TPrivacyVisibility;
	createdAt: Date;
	updatedAt: Date;
}
