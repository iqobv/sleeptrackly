import { AchievementType } from '@generated/prisma/enums';

export const ACHIEVEMENT_CHECK_EVENT = 'achievement.check';

export class AchievementCheckEvent {
	public readonly userId: string;
	public readonly type: AchievementType;

	constructor(payload: { userId: string; type: AchievementType }) {
		this.userId = payload.userId;
		this.type = payload.type;
	}
}
