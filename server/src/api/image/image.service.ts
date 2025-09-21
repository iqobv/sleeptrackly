import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

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
			this.httpService.get(cloudinaryUrl, {
				responseType: 'stream',
			}),
		);

		if (!response) throw new BadGatewayException('Error getting image');

		return response;
	}
}
