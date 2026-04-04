import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
	schema: 'prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: process.env.POSTGRES_URI as string,
	},
});
