export const formatTime = (seconds) => {
	const time = [];

	seconds = Math.floor(seconds);

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	time.push(hours.toString().padStart(2, '0'));
	time.push(minutes.toString().padStart(2, '0'));
	time.push(secs.toString().padStart(2, '0'));

	return time;
};
