export interface WakeUpArgs {
	userId: string;
	sleepStart: Date;
	clickedAt: Date;
	dateForChart?: string;
	rating: number;
	isVerified: boolean;
	timezone: string;
}
