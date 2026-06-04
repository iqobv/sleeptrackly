import { SleepReward } from '@api/reward/interfaces';
import { SleepStart } from './sleep-start.interface';

export interface SleepEnd extends Omit<SleepStart, 'sleepStart'> {
	reward: SleepReward;
	sleepStart: Date | null;
}
