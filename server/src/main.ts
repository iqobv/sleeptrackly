import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
	getSessionConfig,
	getValidationPipeConfig,
} from './config';
import { setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);

	const redisClient = createClient({
		url: config.getOrThrow<string>('REDIS_URI'),
	});
	await redisClient.connect();

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

	app.set('trust proxy', 1);

	app.enableCors(getCorsConfig(config));
	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());
	app.use(session(getSessionConfig(config, redisClient)));

	app.use(passport.initialize());
	app.use(passport.session());

	setupSwagger(app);

	await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
