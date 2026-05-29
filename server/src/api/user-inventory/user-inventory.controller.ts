import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
import { LanguageQueryDto, PaginationQueryWithLanguageDto } from '@libs/dto';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	PaginatedUserInventoryDto,
	UpdateUserInvetoryDto,
	UserInventoryItemDto,
} from './dto';
import { UserInventoryService } from './user-inventory.service';

@ApiTags('User Inventory')
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
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
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
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
	@ApiOkResponse({ type: UserInventoryItemDto })
	@Patch(':id/equip')
	async equipItem(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.userInventoryService.equipItem(userId, id);
	}

	@ApiOperation({ summary: 'Update user inventory item' })
	@Auth()
	@ApiOkResponse({ type: UserInventoryItemDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
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
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.USER_INVENTORY.DELETED)
	@Auth()
	@Delete(':id')
	async removeItem(@Param('id') id: string, @Authorized('id') userId: string) {
		return await this.userInventoryService.removeItem(userId, id);
	}
}
