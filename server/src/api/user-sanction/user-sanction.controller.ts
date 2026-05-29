import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserSanctionDto } from './dto';
import { UserSanctionService } from './user-sanction.service';

@ApiTags('User Sanction')
@Controller('user-sanctions')
export class UserSanctionController {
	constructor(private readonly userSanctionService: UserSanctionService) {}

	@Auth()
	@ApiOperation({ summary: 'Get all sanctions for the authenticated user' })
	@ApiOkResponse({ type: [UserSanctionDto] })
	@Get('me')
	async getUserSanctions(@Authorized('id') userId: string) {
		return await this.userSanctionService.findByUserId(userId);
	}
}
