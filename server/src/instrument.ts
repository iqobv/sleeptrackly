import { IS_DEV_ENV } from '@libs/utils/is-dev.util';
import * as Sentry from '@sentry/nestjs';

const isProd = !IS_DEV_ENV;

Sentry.init({
	dsn: process.env.SENTRY_DNS,
	sendDefaultPii: true,
	enabled: isProd,
});
