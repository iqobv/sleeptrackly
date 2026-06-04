import { SleepEntry } from "@generated/prisma/client";

export interface SleepStart {
	isSleeping: boolean;
	sleepStart: Date;
	sleepEntry: SleepEntry | null;
}
