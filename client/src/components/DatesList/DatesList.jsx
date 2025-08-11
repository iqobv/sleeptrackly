import Daily from './Daily/Daily';
import Weekly from './Weekly/Weekly';

import styles from './DatesList.module.scss';

const DatesList = ({ data, type }) => {
	return (
		<div className={`section ${styles['dates-list-container']}`}>
			{type === 'daily' && <Daily data={data} />}
			{type === 'weekly' && <Weekly data={data} />}
		</div>
	);
};

export default DatesList;
