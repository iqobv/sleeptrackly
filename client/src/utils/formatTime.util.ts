export const formatTime = (seconds: number): string[] => {
	const time = ['00', '00', '00'];

	seconds = Math.floor(seconds);

	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	time[0] = hours.toString().padStart(2, '0');
	time[1] = minutes.toString().padStart(2, '0');
	time[2] = secs.toString().padStart(2, '0');

	return time;
};
