import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const getCorsConfig = (configService: ConfigService): CorsOptions => ({
	origin: configService
		.getOrThrow<string>('ALLOWED_ORIGIN')
		.split(',')
		.map((url) => url.trim()),
	credentials: true,
	allowedHeaders: '*',
});
