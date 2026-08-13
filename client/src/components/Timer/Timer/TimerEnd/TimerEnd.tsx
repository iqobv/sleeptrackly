'use client';

import { SleepEntryForm } from '@/components/SleepEntry/SleepEntryForm';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import {
	UpdateSleepEntryDto,
	UpdateSleepEntryFormDto,
} from '@/dto/sleepEntry/sleepEntry.dto';
import { updateSleepEntryFormSchema } from '@/schemas/sleepEntry/updateSleepEntry.schema';
import { FormSubmit } from '@shared/form';
import {
	Button,
	Modal,
	ModalBody,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@shared/ui';
import { formatLocalDatetime } from '@shared/utils';
import Link from 'next/link';
import { UseTimerReturnType } from '../useTimer.hook';
import styles from './TimerEnd.module.scss';

interface TimerEndProps extends Pick<
	UseTimerReturnType,
	| 'handleSaveSleep'
	| 'resumeTimer'
	| 'sleepStatus'
	| 'finishTime'
	| 'finishedSleep'
> {
	open: boolean;
	onClose: () => void;
}

export const TimerEnd = ({
	finishTime,
	sleepStatus,
	handleSaveSleep,
	resumeTimer,
	finishedSleep,
	onClose,
	open,
}: TimerEndProps) => {
	const defaultSleepStart = sleepStatus?.sleepStart
		? new Date(sleepStatus.sleepStart).toISOString()
		: new Date().toISOString();

	const defaultSleepEnd = finishTime
		? new Date(finishTime).toISOString()
		: new Date().toISOString();

	const handleSubmit = (data: UpdateSleepEntryFormDto) => {
		const { sleepStart, sleepEnd, ...rest } = data;

		if (!sleepEnd) return;

		const payload: UpdateSleepEntryDto = {
			...rest,
			sleepStart: sleepStart !== defaultSleepStart ? sleepStart : undefined,
			sleepEnd,
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		};

		handleSaveSleep(payload);
	};

	const handleClose = () => {
		if (finishedSleep) {
			onClose();
		} else {
			resumeTimer();
		}
	};

	return (
		<Modal open={open} onOpenChange={handleClose}>
			<ModalContent className={styles.modalContent}>
				<ModalHeader>Sleep Summary</ModalHeader>
				<SleepEntryForm<UpdateSleepEntryFormDto>
					schema={updateSleepEntryFormSchema}
					defaultValues={{
						rating: 0,
						sleepStart: formatLocalDatetime(defaultSleepStart),
						sleepEnd: formatLocalDatetime(defaultSleepEnd),
					}}
					onSubmit={handleSubmit}
					formBodyWrapper={ModalBody}
					customSubmit={
						<ModalFooter className={styles.modalFooter}>
							{finishedSleep ? (
								<Button asChild>
									<Link href={PRIVATE_PAGES.DASHBOARD}>Go To Dashboard</Link>
								</Button>
							) : (
								<>
									<FormSubmit>Save Sleep Record</FormSubmit>
									<ModalClose asChild>
										<Button variant="text" color="secondary" size="sm">
											Resume Timer
										</Button>
									</ModalClose>
								</>
							)}
						</ModalFooter>
					}
				/>
			</ModalContent>
		</Modal>
	);
};
