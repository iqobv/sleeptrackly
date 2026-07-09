export interface WakeUpArgs {
	userId: string;
	sleepStart: Date;
	clickedAt: Date;
	dateForChart?: string;
	rating: number;
	isEdited: boolean;
	timezone: string;
}
