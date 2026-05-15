import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserSanctionDto } from './dto';
import { UserSanctionService } from './user-sanction.service';

@ApiTags('User Sanction')
@Controller('user-sanctions')
export class UserSanctionController {
	constructor(private readonly userSanctionService: UserSanctionService) {}

	@Auth()
	@ApiOkResponse({ type: [UserSanctionDto] })
	@Get('me')
	async getUserSanctions(@Authorized('id') userId: string) {
		return await this.userSanctionService.findByUserId(userId);
	}
}
