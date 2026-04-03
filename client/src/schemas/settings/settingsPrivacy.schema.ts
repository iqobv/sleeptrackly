import { PRIVACY_VISIBILITY } from '@/constants';
import z from 'zod';

export const settingsPrivacySchema = z.object({
	acceptFriendRequests: z.boolean().optional(),
	showActivity: z.boolean().optional(),
	profileVisibility: z.enum(PRIVACY_VISIBILITY).optional(),
	achievementsVisibility: z.enum(PRIVACY_VISIBILITY).optional(),
	statisticsVisibility: z.enum(PRIVACY_VISIBILITY).optional(),
});
