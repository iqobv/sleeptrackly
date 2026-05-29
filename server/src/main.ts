import { CustomExceptionFilter } from '@libs/filters';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
	getValidationPipeConfig,
} from './config';
import './instrument';
import { isDev, setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);
	const isProd = !isDev(config);

	app.use(
		helmet({
			crossOriginOpenerPolicy: { policy: 'unsafe-none' },
			contentSecurityPolicy: {
				directives: {
					...helmet.contentSecurityPolicy.getDefaultDirectives(),
					'script-src': [
						"'self'",
						"'unsafe-inline'",
						"'unsafe-eval'",
						'https://cdn.jsdelivr.net',
					],
					'style-src': [
						"'self'",
						"'unsafe-inline'",
						'https://fonts.googleapis.com',
					],
					'font-src': ["'self'", 'https://fonts.gstatic.com'],
					'img-src': [
						"'self'",
						'data:',
						'https://cdn.jsdelivr.net',
						'https://cdn.sleeptrackly.com',
						'https://www.sleeptrackly.com',
					],
					'upgrade-insecure-requests': isProd ? [] : null,
				},
			},
		}),
	);

	app.set('trust proxy', true);

	app.enableCors(getCorsConfig(config));

	app.use(json({ limit: '1mb' }));
	app.use(urlencoded({ extended: true, limit: '1mb' }));

	app.use(cookieParser());

	app.useGlobalFilters(new CustomExceptionFilter());

	app.use(
		'/docs',
		basicAuth({
			challenge: true,
			users: {
				[config.getOrThrow<string>('SWAGGER_USER')]:
					config.getOrThrow<string>('SWAGGER_PASSWORD'),
			},
		}),
	);

	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());

	setupSwagger(app);

	await app.listen(process.env.PORT ?? 5000, '0.0.0.0');
}

bootstrap().catch((err) => {
	console.error('Failed to bootstrap the application:', err);
	process.exit(1);
});
