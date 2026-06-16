export const SLEEP_RECORDED_EVENT = 'sleep.recorded';

export class SleepRecordedEvent {
	public readonly userId: string;
	public readonly dateForChart: string;
	public readonly isManual?: boolean;

	constructor(args: {
		userId: string;
		dateForChart: string;
		isManual?: boolean;
	}) {
		this.userId = args.userId;
		this.dateForChart = args.dateForChart;
		this.isManual = args.isManual;
	}
}
