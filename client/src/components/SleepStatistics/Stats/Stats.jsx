import { formatTime } from '../../../utils/formatTime';

const Stats = ({ data }) => {
	const {
		totalSleepDuration: total,
		averageSleepDurationForWeek: avgForWeek,
		averageSleepDurationByData: avgByData,
	} = data;

	return (
		<div>
			<p>In this week you slept {formatTime(total).join(':')}</p>
			<p>Average sleep duration for week: {formatTime(avgForWeek).join(':')}</p>
			<p>Average sleep duration by data: {formatTime(avgByData).join(':')}</p>
		</div>
	);
};

export default Stats;
