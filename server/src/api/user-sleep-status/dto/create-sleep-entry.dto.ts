export class CreateSleepEntryDto {
	userId: string;
	sleepStart: Date;
	sleepEnd: Date;
	sleepDuration: number;
	dateForChart: string;
	rating: number;
}
