import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserSanctionDto } from './dto';
import { UserSanctionService } from './user-sanction.service';

@Auth()
@ApiTags('User Sanction')
@Controller('user-sanctions')
export class UserSanctionController {
	constructor(private readonly userSanctionService: UserSanctionService) {}

	/** Get all sanctions for the authenticated user */
	@Get('me')
	@ApiOkResponse({ type: [UserSanctionDto] })
	public async getUserSanctions(
		@Authorized('id') userId: string,
	): Promise<UserSanctionDto[]> {
		return await this.userSanctionService.findByUserId(userId);
	}
}
