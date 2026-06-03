import { PrivacyVisibility } from '@/types';
import z from 'zod';

export const settingsPrivacySchema = z.object({
	acceptFriendRequests: z.boolean().optional(),
	showActivity: z.boolean().optional(),
	profileVisibility: z.enum(PrivacyVisibility).optional(),
	achievementsVisibility: z.enum(PrivacyVisibility).optional(),
	statisticsVisibility: z.enum(PrivacyVisibility).optional(),
});
