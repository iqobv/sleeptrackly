'use client';

import { SleepEntry } from '@/types/dashboard/dashboard.types';
import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from '@shared/ui';
import { FaEllipsisVertical } from 'react-icons/fa6';
import styles from './DashboardSleepSessionCardDropdown.module.scss';
import { SleepSessionCreate } from './SleepSessionCreate';
import { SleepSessionDelete } from './SleepSessionDelete';
import { SleepSessionEdit } from './SleepSessionEdit';

interface DashboardSleepSessionCardDropdownProps {
	showAddButton?: boolean;
	date: Date;
	isEmpty?: boolean;
	sleepEntry?: SleepEntry;
}

export const DashboardSleepSessionCardDropdown = ({
	showAddButton = false,
	date,
	isEmpty = false,
	sleepEntry,
}: DashboardSleepSessionCardDropdownProps) => {
	const now = new Date();
	const isFuture = date ? date > now : false;

	const finalShowAddButton = !isFuture && (showAddButton || !sleepEntry?.id);

	if (isFuture) return null;

	return (
		<Dropdown>
			<DropdownTrigger asChild>
				<Button isIcon variant="text" isRounded>
					<FaEllipsisVertical size={18} />
				</Button>
			</DropdownTrigger>
			<DropdownContent align="end">
				{finalShowAddButton && (
					<DropdownItem asChild>
						<SleepSessionCreate date={date}>
							<Button variant="text" className={styles.button}>
								Add Sleep Session
							</Button>
						</SleepSessionCreate>
					</DropdownItem>
				)}
				{!isEmpty && sleepEntry && (
					<>
						<DropdownItem asChild>
							<SleepSessionEdit date={date} sleepEntry={sleepEntry}>
								<Button variant="text" className={styles.button}>
									Edit Sleep Session
								</Button>
							</SleepSessionEdit>
						</DropdownItem>
						<DropdownItem asChild>
							<SleepSessionDelete sleepEntry={sleepEntry} date={date} />
						</DropdownItem>
					</>
				)}
			</DropdownContent>
		</Dropdown>
	);
};
