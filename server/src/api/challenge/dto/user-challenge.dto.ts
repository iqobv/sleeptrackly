import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ChallengeDto } from './challenge.dto';
import { UserChallengeEntityDto } from './user-challenge.entity.dto';

export class BaseUserChallengeDto extends OmitType(UserChallengeEntityDto, [
	'tasks',
] as const) {}

export class UserChallengeDto extends UserChallengeEntityDto {}

export class FullUserChallengeDto extends BaseUserChallengeDto {
	@Type(() => ChallengeDto)
	@Expose()
	challenge: ChallengeDto;
}
