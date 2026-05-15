import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
	getValidationPipeConfig,
} from './config';
import './instrument';
import { setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);

	app.set('trust proxy', true);

	app.enableCors(getCorsConfig(config));

	app.use(json({ limit: '1mb' }));
	app.use(urlencoded({ extended: true, limit: '1mb' }));

	app.use(cookieParser());

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
