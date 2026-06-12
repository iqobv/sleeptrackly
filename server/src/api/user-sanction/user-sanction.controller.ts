import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserSanctionDto } from './dto/user-sanction.dto';
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
