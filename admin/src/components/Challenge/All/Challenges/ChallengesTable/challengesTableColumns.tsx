import { PAGES } from '@/config/pages.config';
import { Challenge } from '@/types/challenge/challenge.types';
import { Columns } from '@shared/tables';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { DeleteChallenge } from '../../DeleteChallenge/DeleteChallenge';
import styles from './ChallengesTable.module.scss';

export const CHALLENGES_TABLE_COLUMNS: Columns<Challenge> = [
	{
		accessorKey: 'type',
		header: 'Type',
		enableSorting: false,
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'tier',
		header: 'Tier',
		enableSorting: false,
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'visibility',
		header: 'Visibility',
		enableSorting: false,
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'durationDays',
		header: 'Duration (days)',
		enableSorting: true,
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'availableFrom',
		header: 'Available From',
		enableSorting: true,
		cell: (props) => <>{new Date(String(props.getValue())).toLocaleString()}</>,
	},
	{
		accessorKey: 'availableTo',
		header: 'Available To',
		enableSorting: true,
		cell: (props) => <>{new Date(String(props.getValue())).toLocaleString()}</>,
	},
	{
		accessorKey: '',
		header: 'Actions',
		enableSorting: false,
		cell: (props) => (
			<div className={styles.actionsCell}>
				<Button variant="link" size="sm" asChild>
					<Link href={PAGES.CHALLENGE(props.row.original.id)}>Details</Link>
				</Button>
				<DeleteChallenge id={props.row.original.id} />
			</div>
		),
	},
];
