import { defineConfig } from '@prisma/config';
import 'dotenv/config';

const postgresUri = process.env.POSTGRES_URI;

if (!postgresUri) {
	throw new Error('Missing required environment variable: POSTGRES_URI');
}

export default defineConfig({
	schema: 'prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: postgresUri,
	},
});
