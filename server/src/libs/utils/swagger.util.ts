import { getSwaggerConfig } from '@config/swagger.config';
import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export const setupSwagger = (app: INestApplication): void => {
	const config = getSwaggerConfig();

	const documentFactory = (): OpenAPIObject =>
		SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('docs-raw', app, documentFactory(), {
		jsonDocumentUrl: '/docs-json',
		yamlDocumentUrl: '/docs-yaml',
		ui: false,
	});

	app.use(
		'/docs',
		apiReference({
			spec: {
				content: documentFactory(),
			},
			title: 'Sleeptrackly API Docs',
			pageTitle: 'Sleeptrackly API Docs',
			favicon: 'https://cdn.sleeptrackly.com/Sleeptrackly.png',
			theme: 'default',
		}),
	);
};
