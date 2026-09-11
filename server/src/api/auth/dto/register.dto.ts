import { CreateUserDto } from '@api/user/dto/create-user.dto';
import { OmitType } from '@nestjs/swagger';

export class RegisterDto extends OmitType(CreateUserDto, [
	'emailVerified',
] as const) {}
