import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import {
	CreaeteUserSanctionDto,
	UpdateUserSanctionDto,
	UserSanctionDto,
} from './dto';
import { UserSanctionService } from './user-sanction.service';

@ApiTags('Admin User Sanction')
@Controller('admin/user-sanctions')
export class AdminUserSanctionController {
	constructor(private readonly userSanctionService: UserSanctionService) {}

	@Auth('ADMIN')
	@ApiOkResponse({ type: [UserSanctionDto] })
	@Get('user/:userId')
	async findByUserId(@Param('userId') userId: string) {
		return await this.userSanctionService.findByUserId(userId);
	}

	@Auth('ADMIN')
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiNotFoundResponse({ description: 'User sanction not found' })
	@Get('id/:id')
	async findById(@Param('id') id: string) {
		return await this.userSanctionService.findById(id);
	}

	@Auth('ADMIN')
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiBadRequestResponse({
		description:
			'Start date must be before end date\n\nEnd date must be in the future',
	})
	@Post()
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreaeteUserSanctionDto,
	) {
		return await this.userSanctionService.create(userId, dto);
	}

	@Auth('ADMIN')
	@Patch(':id')
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiBadRequestResponse({ description: 'End date must be in the future' })
	@ApiNotFoundResponse({ description: 'User sanction not found' })
	async update(@Param('id') id: string, @Body() dto: UpdateUserSanctionDto) {
		return await this.userSanctionService.update(id, dto);
	}

	@Auth('ADMIN')
	@Delete(':id')
	@ApiOkResponse({ type: Boolean })
	@ApiNotFoundResponse({ description: 'User sanction not found' })
	async remove(@Param('id') id: string) {
		return await this.userSanctionService.remove(id);
	}
}
