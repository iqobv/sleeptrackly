import { PrismaClient } from '@generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import 'dotenv/config';
import { Pool } from 'pg';

dayjs.extend(isoWeek);
dayjs.extend(utc);

const connectionString = process.env.POSTGRES_URI;
const caCert = process.env.DB_CA_CERT;

if (!connectionString) {
	throw new Error(
		'Missing required environment variable: POSTGRES_URI. Set it before running data-migration-runner.',
	);
}

if (!caCert) {
	throw new Error(
		'Missing required environment variable: DB_CA_CERT. Set it before running data-migration-runner.',
	);
}

const cleanConnectionString = connectionString.split('?')[0];

const pool = new Pool({
	connectionString: cleanConnectionString,
	// ssl: false,
	ssl: {
		ca: caCert.replace(/\\n/g, '\n'),
		rejectUnauthorized: true,
	},
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
	adapter: adapter,
});

const calculateAvgBedtimeOffset = (dates: Date[]): number => {
	if (dates.length === 0) return 0;

	const totalMinutes = dates.reduce((sum, date) => {
		const d = dayjs(date).utc();
		const absoluteMinutes = d.hour() * 60 + d.minute();
		const adjustedMinutes =
			absoluteMinutes < 720 ? absoluteMinutes + 1440 : absoluteMinutes;

		return sum + adjustedMinutes;
	}, 0);

	const averageMinutes = Math.round(totalMinutes / dates.length);

	return averageMinutes >= 1440 ? averageMinutes - 1440 : averageMinutes;
};

const calculateAvgWakeTimeOffset = (dates: Date[]): number => {
	if (dates.length === 0) return 0;

	const totalMinutes = dates.reduce((sum, date) => {
		const d = dayjs(date).utc();
		return sum + (d.hour() * 60 + d.minute());
	}, 0);

	return Math.round(totalMinutes / dates.length);
};

async function runDataMigration(): Promise<void> {
	console.log('Starting data migration');

	const users = await prisma.sleepEntry.findMany({
		select: { userId: true },
		distinct: ['userId'],
	});

	if (users.length === 0) {
		console.log('No existing users without new tables. Migration complete.');
		return;
	}

	try {
		for (const { userId } of users) {
			const entries = await prisma.sleepEntry.findMany({
				where: { userId },
				orderBy: { sleepEnd: 'asc' },
			});

			if (entries.length === 0) continue;

			const groupedByWeek = entries.reduce(
				(acc, entry) => {
					const d = dayjs(entry.sleepEnd).utc();
					const key = `${d.isoWeekYear()}-${d.isoWeek()}`;

					if (!acc[key]) {
						acc[key] = [];
					}
					acc[key].push(entry);
					return acc;
				},
				{} as Record<string, typeof entries>,
			);

			for (const [key, weekRecords] of Object.entries(groupedByWeek)) {
				const [yearStr, weekStr] = key.split('-');
				const year = parseInt(yearStr, 10);
				const weekNumber = parseInt(weekStr, 10);

				const weekStartDate = dayjs()
					.utc()
					.year(year)
					.month(0)
					.date(4)
					.startOf('isoWeek')
					.add(weekNumber - 1, 'week')
					.toDate();

				const weekEndDate = dayjs(weekStartDate).endOf('isoWeek').toDate();

				const totalSleepDuration = weekRecords.reduce(
					(acc, curr) => acc + curr.sleepDuration,
					0,
				);
				const avgSleepDuration = Math.round(
					totalSleepDuration / weekRecords.length,
				);

				const sortedByDuration = [...weekRecords].sort(
					(a, b) => a.sleepDuration - b.sleepDuration,
				);
				const minSleep = sortedByDuration[0];
				const maxSleep = sortedByDuration[sortedByDuration.length - 1];

				const daysTracked = weekRecords.length;
				const transactionRecords = await prisma.coinTransaction.findMany({
					where: {
						userId,
						type: 'SLEEP_REWARD',
						referenceId: { in: entries.map((record) => record.id) },
					},
				});

				const coinsEarned = transactionRecords.reduce(
					(acc, curr) => acc + curr.amount,
					0,
				);

				const avgBedtimeOffset = calculateAvgBedtimeOffset(
					weekRecords.map((r) => r.sleepStart),
				);
				const avgWakeTimeOffset = calculateAvgWakeTimeOffset(
					weekRecords.map((r) => r.sleepEnd),
				);

				await prisma.weeklySleepSummary.upsert({
					where: {
						userId_year_weekNumber: {
							userId,
							year,
							weekNumber,
						},
					},
					update: {
						totalSleepDuration,
						avgSleepDuration,
						minSleepDuration: minSleep.sleepDuration,
						minSleepDate: minSleep.sleepEnd,
						maxSleepDuration: maxSleep.sleepDuration,
						maxSleepDate: maxSleep.sleepEnd,
						avgBedtimeOffset,
						avgWakeTimeOffset,
						daysTracked,
						coinsEarned,
					},
					create: {
						userId,
						year,
						weekNumber,
						weekStartDate,
						weekEndDate,
						totalSleepDuration,
						avgSleepDuration,
						minSleepDuration: minSleep.sleepDuration,
						minSleepDate: minSleep.sleepEnd,
						maxSleepDuration: maxSleep.sleepDuration,
						maxSleepDate: maxSleep.sleepEnd,
						avgBedtimeOffset,
						avgWakeTimeOffset,
						daysTracked,
						sleepScoreAvg: 0,
						coinsEarned,
					},
				});
			}
		}

		console.log(`Successfully created records.`);
	} catch (error) {
		console.error('ERROR durin data migration:', error);
		process.exit(1);
	}
}

runDataMigration()
	.catch((e) => {
		console.error('FATAL ERROR in migration script:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		process.exit(0);
	});
