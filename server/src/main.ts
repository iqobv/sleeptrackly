import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import basicAuth from 'express-basic-auth';
import session, { Store } from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import {
	getApiVersioningConfig,
	getCorsConfig,
	getSessionConfig,
	getValidationPipeConfig,
} from './config';
import { PrismaService } from './infra/prisma/prisma.service';
import './instrument';
import { SessionRefreshInterceptor } from './libs/Interceptors';
import { setupSwagger } from './libs/utils';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const config = app.get(ConfigService);
	const redisStore: Store = app.get('REDIS_STORE');
	const prisma = app.get(PrismaService);

	app.use(cookieParser(config.getOrThrow<string>('COOKIE_SECRET')));

	app.set('trust proxy', true);

	app.use(
		'/docs*splat',
		basicAuth({
			challenge: true,
			users: {
				[config.getOrThrow<string>('SWAGGER_USER')]:
					config.getOrThrow<string>('SWAGGER_PASSWORD'),
			},
		}),
	);

	app.enableCors(getCorsConfig(config));
	app.useGlobalPipes(getValidationPipeConfig());
	app.enableVersioning(getApiVersioningConfig());
	app.use(session(getSessionConfig(config, redisStore)));

	app.use(passport.initialize());
	app.use(passport.session());

	app.useGlobalInterceptors(new SessionRefreshInterceptor(prisma));

	setupSwagger(app);

	await app.listen(process.env.PORT ?? 5000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
