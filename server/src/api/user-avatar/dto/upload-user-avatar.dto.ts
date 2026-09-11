import { ApiProperty } from '@nestjs/swagger';

export class UploadUserAvatarDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	avatar: Express.Multer.File;
}
