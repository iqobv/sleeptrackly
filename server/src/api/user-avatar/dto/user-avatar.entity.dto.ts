import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class UserAvatarEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() url: string;
	@Expose() isDefault: boolean;
}
