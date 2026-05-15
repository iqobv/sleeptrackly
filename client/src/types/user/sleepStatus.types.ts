export interface SleepStatus {
	id: string;
	userId: string;
	isSleeping: boolean;
	sleepStart: Date | null;
	createdAt: Date;
	updatedAt: Date;
}
