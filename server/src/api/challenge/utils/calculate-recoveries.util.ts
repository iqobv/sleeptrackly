interface RecoveryThresholds {
	minDays: number;
	recoveries: number;
}

const RECOVERY_THRESHOLDS: RecoveryThresholds[] = [
	{ minDays: 30, recoveries: 4 },
	{ minDays: 21, recoveries: 3 },
	{ minDays: 14, recoveries: 2 },
	{ minDays: 0, recoveries: 1 },
];

export const calculateMaxRecoveries = (durationDays: number): number => {
	const config = RECOVERY_THRESHOLDS.find(
		(threshold) => durationDays >= threshold.minDays,
	);

	return config?.recoveries ?? 1;
};
