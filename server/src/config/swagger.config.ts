import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const getSwaggerConfig = (): Omit<OpenAPIObject, 'paths'> =>
	new DocumentBuilder()
		.setTitle('Sleeptrackly API')
		.setDescription('Sleeptrackly API description')
		.setVersion('1.5.3')
		.addCookieAuth('accessToken', {
			type: 'apiKey',
			in: 'cookie',
		})
		.build();
