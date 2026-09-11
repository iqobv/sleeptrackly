import {
	DeleteObjectCommand,
	DeleteObjectCommandOutput,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';
import { EnvService } from '@infra/env/env.service';
import { Injectable } from '@nestjs/common';
import path from 'path';
import { r2EnvSchema } from '../../config/schemas/r2.schema';

@Injectable()
export class R2Service {
	private readonly s3Client: S3Client;
	private readonly bucketName: string;

	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(r2EnvSchema);

		this.s3Client = new S3Client({
			region: 'auto',
			endpoint: config.CLOUDFLARE_S3_API,
			credentials: {
				accessKeyId: config.CLOUDFLARE_ACCESS_KEY_ID,
				secretAccessKey: config.CLOUDFLARE_ACCESS_SECRET_KEY,
			},
		});
		this.bucketName = config.R2_BUCKET_NAME;
	}

	public async upload(
		fileBuffer: Buffer,
		key: string,
		mimetype: string,
	): Promise<{ key: string; extension: string }> {
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

	public async delete(key: string): Promise<DeleteObjectCommandOutput> {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		return await this.s3Client.send(command);
	}
}
