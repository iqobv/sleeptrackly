import { getSwaggerConfig } from '@config';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const setupSwagger = (app: INestApplication) => {
	const config = getSwaggerConfig();

	const document = SwaggerModule.createDocument(app, config);

	app.use(
		'/docs',
		apiReference({
			spec: {
				content: document,
			},
			title: 'Sleeptrackly API Docs',
			pageTitle: 'Sleeptrackly API Docs',
			favicon: 'https://cdn.sleeptrackly.com/Sleeptrackly.png',
			theme: 'default',
		}),
	);
};
