import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

const connectionString = process.env.POSTGRES_URI;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({
	adapter: adapter,
});

async function runDataMigration() {
	console.log('Starting data migration');

	const usersWithoutTables = await prisma.user.findMany({
		where: {
			userPrivacySettings: null,
		},
		select: {
			id: true,
		},
	});

	if (usersWithoutTables.length === 0) {
		console.log('No existing users without new tables. Migration complete.');
		return;
	}

	const dataToCreate = usersWithoutTables.map((user) => ({
		userId: user.id,
	}));

	try {
		const result = await prisma.userPrivacySettings.createMany({
			data: dataToCreate,
			skipDuplicates: true,
		});

		console.log(`Successfully created ${result.count} default records.`);
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
