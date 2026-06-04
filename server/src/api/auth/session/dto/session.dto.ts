import { DefaultFieldsDto } from '@libs/dto';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class SessionDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() expiresAt: Date;
	@Expose() rotatedAt: Date | null;
	@Expose() ipAddress: string | null;
	@Expose() city: string | null;
	@Expose() region: string | null;
	@Expose() countryCode: string | null;
	@Expose() osName: string | null;
	@Expose() deviceType: string | null;
	@Expose() browserName: string | null;
	@Expose() browserVersion: string | null;
	@Expose() isCurrent: boolean;
}
