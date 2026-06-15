export const SLEEP_ENDED_EVENT = 'sleep.ended';

export class SleepEndedEvent {
	public readonly userId: string;
	public readonly dateForChart: string;

	constructor(args: { userId: string; dateForChart: string }) {
		this.userId = args.userId;
		this.dateForChart = args.dateForChart;
	}
}
