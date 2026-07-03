'use client';

import {
	Button,
	Dropdown,
	DropdownContent,
	DropdownItem,
	DropdownTrigger,
} from '@shared/ui';
import { FaEllipsisVertical } from 'react-icons/fa6';
import styles from './DashboardSleepSessionCard.module.scss';

interface DashboardSleepSessionCardDropdownProps {
	id?: string;
	showAddButton?: boolean;
	date?: Date;
	isEmpty?: boolean;
}

export const DashboardSleepSessionCardDropdown = ({
	id,
	showAddButton = false,
	date,
	isEmpty = false,
}: DashboardSleepSessionCardDropdownProps) => {
	const now = new Date();
	const isFuture = date ? date > now : false;

	const finalShowAddButton = !isFuture && (showAddButton || !id);

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
						<Button variant="text" className={styles.button}>
							Add Sleep Session
						</Button>
					</DropdownItem>
				)}
				{!isEmpty && (
					<>
						<DropdownItem asChild>
							<Button variant="text" className={styles.button}>
								Edit Sleep Session
							</Button>
						</DropdownItem>
						<DropdownItem asChild>
							<Button variant="text" color="danger" className={styles.button}>
								Delete Sleep Session
							</Button>
						</DropdownItem>
					</>
				)}
			</DropdownContent>
		</Dropdown>
	);
};
