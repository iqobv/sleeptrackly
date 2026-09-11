import { PAGES } from '@/config/pages.config';
import { ChallengeTemplate } from '@/types/challenge/challenge.types';
import { Columns } from '@shared/tables';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { DeleteChallengeTemplate } from '../../DeleteChallengeTemplate/DeleteChallengeTemplate';
import styles from './ChallengeTemplatesTable.module.scss';

export const CHALLENGE_TEMPLATES_TABLE_COLUMNS: Columns<ChallengeTemplate> = [
	{
		accessorKey: 'type',
		header: 'Type',
		enableSorting: false,
		meta: {
			style: {
				width: '50%',
			},
		},
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'tier',
		header: 'Tier',
		enableSorting: false,
		cell: (props) => <>{props.getValue()}</>,
	},
	{
		accessorKey: 'isActive',
		header: 'Active',
		enableSorting: false,
		cell: (props) => <>{props.getValue() ? 'Yes' : 'No'}</>,
	},
	{
		accessorKey: 'createdAt',
		header: 'Created At',
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
					<Link href={PAGES.CHALLENGE_TEMPLATE(props.row.original.id)}>
						Details
					</Link>
				</Button>
				<DeleteChallengeTemplate id={props.row.original.id} />
			</div>
		),
	},
];
