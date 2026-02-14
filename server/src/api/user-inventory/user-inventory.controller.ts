import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { LanguageQueryDto, PaginationQueryWithLanguageDto } from 'src/libs/dto';
import {
	PaginatedUserInventoryDto,
	UpdateUserInvetoryDto,
	UserInventoryItemDto,
} from './dto';
import { UserInventoryService } from './user-inventory.service';

@Controller('inventory')
export class UserInventoryController {
	constructor(private readonly userInventoryService: UserInventoryService) {}

	@ApiOperation({ summary: 'Get current user inventory' })
	@Auth()
	@ApiOkResponse({ type: PaginatedUserInventoryDto })
	@Get('me')
	async getUserInventory(
		@Authorized('id') userId: string,
		@Query() query: PaginationQueryWithLanguageDto,
	) {
		return await this.userInventoryService.getUserInventory(userId, query);
	}

	@ApiOperation({ summary: 'Get user inventory item by id' })
	@Auth()
	@ApiOkResponse({ type: UserInventoryItemDto })
	@Get(':id')
	async findById(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Query() query: LanguageQueryDto,
	) {
		return await this.userInventoryService.findById(
			id,
			userId,
			query.language ?? 'en',
		);
	}

	@ApiOperation({ summary: 'Equip inventory item' })
	@Auth()
	@ApiOkResponse({ type: UserInventoryItemDto })
	@Patch(':id/equip')
	async equipItem(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.userInventoryService.equipItem(userId, id);
	}

	@ApiOperation({ summary: 'Update user inventory item' })
	@Auth()
	@ApiOkResponse({ type: UserInventoryItemDto })
	@Patch(':id')
	async updateUserInventoryItem(
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserInvetoryDto,
	) {
		return await this.userInventoryService.updateUserInventoryItem(
			id,
			userId,
			dto,
		);
	}

	@ApiOperation({ summary: 'Remove item from user inventory' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Delete(':id')
	async removeItem(@Param('id') id: string, @Authorized('id') userId: string) {
		return await this.userInventoryService.removeItem(userId, id);
	}
}
