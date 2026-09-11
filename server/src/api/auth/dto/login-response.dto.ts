import { UserDto } from '@api/user/dto/user-response.dto';
import { TokensDto } from './tokens.dto';

export class LoginServiceResponseDto extends TokensDto {
	user: UserDto;
}
