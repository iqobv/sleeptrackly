'use client';

import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { UpdateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { updateSleepEntrySchema } from '@/schemas/sleepEntry/updateSleepEntry.schema';
import { Form, FormSubmit } from '@shared/form';
import {
	Button,
	Modal,
	ModalClose,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@shared/ui';
import { formatLocalDatetime } from '@shared/utils';
import Link from 'next/link';
import { useMemo } from 'react';
import { UseTimerReturnType } from '../useTimer.hook';
import styles from './TimerEnd.module.scss';
import { TimerEndBody } from './TimerEndBody/TimerEndBody';

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
	const defaultSleepStart = useMemo(() => {
		return sleepStatus?.sleepStart
			? new Date(sleepStatus.sleepStart).toISOString()
			: new Date().toISOString();
	}, [sleepStatus?.sleepStart]);

	const defaultSleepEnd = useMemo(() => {
		return finishTime
			? new Date(finishTime).toISOString()
			: new Date().toISOString();
	}, [finishTime]);

	const handleSubmit = (data: UpdateSleepEntryDto) => {
		const { sleepStart, sleepEnd, ...rest } = data;

		const isEdited =
			sleepStart !== defaultSleepStart || sleepEnd !== defaultSleepEnd;

		const payload: UpdateSleepEntryDto = {
			...rest,
			sleepStart: sleepStart !== defaultSleepStart ? sleepStart : undefined,
			sleepEnd,
			isEdited,
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
				<Form<UpdateSleepEntryDto>
					schema={updateSleepEntrySchema}
					onSubmit={handleSubmit}
					defaultValues={{
						rating: 0,
						sleepStart: formatLocalDatetime(defaultSleepStart),
						sleepEnd: formatLocalDatetime(defaultSleepEnd),
					}}
				>
					<ModalHeader>Sleep Summary</ModalHeader>
					<TimerEndBody />
					<ModalFooter className={styles.modalFooter}>
						{finishedSleep ? (
							<Button asChild>
								<Link href={PRIVATE_PAGES.DASHBOARD}>Go To Dashboard</Link>
							</Button>
						) : (
							<>
								<FormSubmit>Save Sleep Record</FormSubmit>
								<ModalClose asChild onClick={resumeTimer}>
									<Button variant="text" color="secondary" size="sm">
										Resume Timer
									</Button>
								</ModalClose>
							</>
						)}
					</ModalFooter>
				</Form>
			</ModalContent>
		</Modal>
	);
};
