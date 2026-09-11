import { AppConfig } from '@config/schemas/app.schema';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const getCorsConfig = (config: AppConfig): CorsOptions => {
	return {
		origin: [config.MAIN_URL, config.APP_URL, config.ADMIN_URL],
		credentials: true,
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Accept',
			'X-Requested-With',
			'X-Forwarded-Client-IP',
		],
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
	};
};
