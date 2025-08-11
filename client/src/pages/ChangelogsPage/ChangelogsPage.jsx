import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { fetchAllVersions } from '../../api/changelogs';

import styles from './ChangelogsPage.module.scss';

const ChangelogsPage = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['changelogs'],
		queryFn: fetchAllVersions,
	});

	return (
		<div className={`container ${styles['changelogs-page']}`}>
			<ul>
				{!isLoading &&
					data &&
					data.versions?.map((version) => (
						<li key={version.id}>
							<Link to={`/changelogs/${version.ver}`}>{version.ver}</Link>
						</li>
					))}
			</ul>
			<Link to={`/changelogs/new`}>New</Link>
		</div>
	);
};

export default ChangelogsPage;
