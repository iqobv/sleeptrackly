import {
	Controller,
	Get,
	Param,
	Res,
	Version,
	VERSION_NEUTRAL,
} from '@nestjs/common';
import type { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
	constructor(private readonly imageService: ImageService) {}

	@Version(VERSION_NEUTRAL)
	@Get(':filename')
	async getImage(@Param('filename') filename: string, @Res() res: Response) {
		const image = await this.imageService.getImage(filename);

		res.setHeader('Content-Type', image.headers['content-type']);

		return image.data.pipe(res);
	}
}
