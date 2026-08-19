import { validate } from '@config/env.validation';
import { IS_PROD_ENV } from '@libs/utils/is-dev.util';
import * as Sentry from '@sentry/nestjs';

const config = validate(process.env);

Sentry.init({
	dsn: config.SENTRY_DNS,
	sendDefaultPii: true,
	enabled: IS_PROD_ENV,
});
