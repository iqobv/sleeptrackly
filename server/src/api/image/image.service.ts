import { HttpService } from '@nestjs/axios';
import {
	BadGatewayException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import Stream from 'stream';

@Injectable()
export class ImageService {
	private readonly CLOUDINATY_NAME: string;

	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
	) {
		this.CLOUDINATY_NAME = configService.getOrThrow<string>(
			'CLOUDINARY_CLOUD_NAME',
		);
	}

	async getImage(filename: string) {
		const cloudinaryUrl = `https://res.cloudinary.com/${this.CLOUDINATY_NAME}/image/upload/${filename}`;

		const response = await firstValueFrom(
			this.httpService
				.get<Stream>(cloudinaryUrl, {
					responseType: 'stream',
				})
				.pipe(
					catchError((error: AxiosError) => {
						if (error.response?.status === 404) {
							throw new NotFoundException('Image not found');
						}
						throw new BadGatewayException(
							'Error getting image from Cloudinary',
						);
					}),
				),
		);

		if (!response) {
			throw new BadGatewayException('Error getting image');
		}

		return response;
	}
}
