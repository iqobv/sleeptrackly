import { ApiProperty } from '@nestjs/swagger';

export class SessionDto {
	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	id: string;

	@ApiProperty({ example: 'a81bc81b-dead-4e5d-abff-90865d1e13b1' })
	userId: string;

	@ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
	expiresAt: Date;

	@ApiProperty({ example: '127.0.0.1' })
	ipAddress: string;

	@ApiProperty({
		example:
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36',
	})
	userAgent: string;

	@ApiProperty({ example: 'New York' })
	city: string;

	@ApiProperty({ example: 'New York' })
	region: string;

	@ApiProperty({ example: 'United States' })
	country: string;

	@ApiProperty({ example: 'US' })
	countryCode: string;

	@ApiProperty({ example: 'desktop' })
	deviceType: string;

	@ApiProperty({ example: 'Chrome' })
	browserName: string;

	@ApiProperty({ example: '237.84.2.178' })
	browserVersion: string;
}
