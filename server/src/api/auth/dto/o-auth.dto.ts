import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/api/user/dto';

export class OAuthDto extends OmitType(CreateUserDto, ['password'] as const) {
	provider: string;
	providerId: string;
}
