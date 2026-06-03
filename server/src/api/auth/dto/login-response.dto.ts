import { UserDto } from '@api/user/dto';
import { TokensDto } from './tokens.dto';

export class LoginServiceResponseDto extends TokensDto {
	user: UserDto;
}
