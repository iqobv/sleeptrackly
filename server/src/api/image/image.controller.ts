import {
	Controller,
	Get,
	Param,
	Res,
	Version,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiBadGatewayResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@ApiOperation({ summary: 'Get image' })
	@ApiOkResponse({
		description: 'Returns the requested image',
		content: {
			'image/png': { schema: { type: 'string', format: 'binary' } },
			'image/jpeg': { schema: { type: 'string', format: 'binary' } },
		},
	})
	@ApiBadGatewayResponse({ description: 'Error getting image' })
	@Version(VERSION_NEUTRAL)
	@Get(':filename')
	async getImage(@Param('filename') filename: string, @Res() res: Response) {
		const image = await this.imageService.getImage(filename);

		res.setHeader('Content-Type', image.headers['content-type']);

		return image.data.pipe(res);
	}
}
