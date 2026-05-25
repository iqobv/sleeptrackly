import { R2Service } from '@infra/r2/r2.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageService {
	constructor(private readonly r2Service: R2Service) {}

	async uploadImage(
		file: Express.Multer.File,
		folder: string,
		oldUrl?: string | null,
		placeholderUrl?: string,
	) {
		const isVideo = file.mimetype.startsWith('video/');
		let processedBuffer: Buffer = file.buffer;
		let contentType: string = file.mimetype;
		let extension: string = file.originalname.split('.').pop() || '';

		if (!isVideo) {
			try {
				const pipeline = sharp(file.buffer, { animated: true });

				processedBuffer = await pipeline
					.webp({ quality: 80, effort: 6, lossless: false })
					.toBuffer();
				contentType = 'image/webp';
				extension = 'webp';
			} catch (error) {
				console.error('Sharp error:', error);
				throw new BadRequestException('Failed to process image');
			}
		}

		if (oldUrl && oldUrl !== placeholderUrl) {
			await this.deleteImage(oldUrl);
		}

		const filename = `${uuidv4()}.${extension}`;
		const key = `${folder}/${filename}`;

		const uploadResult = await this.r2Service.upload(
			processedBuffer,
			key,
			contentType,
		);

		return {
			url: uploadResult.key,
			isAnimated: isVideo,
			extension,
		};
	}

	async deleteImage(url: string) {
		try {
			await this.r2Service.delete(url);
		} catch (e) {
			console.error('Delete file error:', e);
		}
	}
}
