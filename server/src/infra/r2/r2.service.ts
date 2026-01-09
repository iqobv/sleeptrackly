import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class R2Service {
	private readonly s3Client: S3Client;
	private readonly bucketName: string;

	constructor(private readonly configService: ConfigService) {
		this.s3Client = new S3Client({
			region: 'auto',
			endpoint: configService.getOrThrow<string>('CLOUDFLARE_S3_API'),
			credentials: {
				accessKeyId: configService.getOrThrow<string>(
					'CLOUDFLARE_ACCESS_KEY_ID',
				),
				secretAccessKey: configService.getOrThrow<string>(
					'CLOUDFLARE_ACCESS_SECRET_KEY',
				),
			},
		});
		this.bucketName = configService.getOrThrow<string>('R2_BUCKET_NAME');
	}

	async upload(fileBuffer: Buffer, key: string, mimetype: string) {
		const extension = path.extname(key);

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			Key: key,
			Body: fileBuffer,
			ContentType: mimetype,
			CacheControl: 'public, max-age=31536000',
		});

		await this.s3Client.send(command);

		return {
			key,
			extension: extension.replace('.', ''),
		};
	}

	async delete(key: string) {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		return await this.s3Client.send(command);
	}
}
