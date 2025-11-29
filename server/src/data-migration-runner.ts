import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function runDataMigration() {
	console.log('Starting data migration: creating default UserSettings...');

	const usersWithoutSettings = await prisma.user.findMany({
		where: {
			notificationSettings: null,
		},
		select: {
			id: true,
		},
	});

	if (usersWithoutSettings.length === 0) {
		console.log(
			'No existing users require default settings. Migration complete.',
		);
		return;
	}

	const dataToCreate = usersWithoutSettings.map((user) => ({
		userId: user.id,
	}));

	try {
		const result = await prisma.userNotificationSettings.createMany({
			data: dataToCreate,
			skipDuplicates: true,
		});

		console.log(
			`Successfully created ${result.count} default UserNotificationSettings records.`,
		);
	} catch (error) {
		console.error(
			'ERROR during UserNotificationSettings data migration:',
			error,
		);
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
