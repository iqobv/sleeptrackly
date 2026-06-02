import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class FcmTokenDto extends DefaultFieldsDto {
	@Expose() token: string;
	@Expose() userId: string;
	@Expose() userAgent: string | null;
}
