import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
import { LanguageQueryDto, PaginationQueryWithLanguageDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	FullUserInventoryItemDto,
	PaginatedUserInventoryDto,
	UpdateUserInvetoryDto,
	UserInventoryItemDto,
} from './dto';
import { UserInventoryService } from './user-inventory.service';

@Auth()
@ApiTags('User Inventory')
@Controller('inventory')
export class UserInventoryController {
	constructor(private readonly userInventoryService: UserInventoryService) {}

	/** Get current user inventory */
	@Get('me')
	@ApiOkResponse({ type: PaginatedUserInventoryDto })
	public async getUserInventory(
		@Authorized('id') userId: string,
		@Query() query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedUserInventoryDto> {
		return await this.userInventoryService.getUserInventory(userId, query);
	}

	/** Get user inventory item by id */
	@Get(':id')
	@ApiOkResponse({ type: FullUserInventoryItemDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
	public async findById(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Query() query: LanguageQueryDto,
	): Promise<FullUserInventoryItemDto> {
		return await this.userInventoryService.findById(
			id,
			userId,
			query.language ?? 'en',
		);
	}

	/** Equip inventory item */
	@Patch(':id/equip')
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
	@ApiOkResponse({ type: UserInventoryItemDto })
	public async equipItem(
		@Authorized('id') userId: string,
		@Param('id') id: string,
	): Promise<UserInventoryItemDto> {
		return await this.userInventoryService.equipItem(userId, id);
	}

	/** Update user inventory item */
	@Patch(':id')
	@ApiOkResponse({ type: UserInventoryItemDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
	public async updateUserInventoryItem(
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserInvetoryDto,
	): Promise<UserInventoryItemDto> {
		return await this.userInventoryService.updateUserInventoryItem(
			id,
			userId,
			dto,
		);
	}

	/** Remove item from user inventory */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.USER_INVENTORY.DELETED)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
	)
	public async removeItem(
		@Param('id') id: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.userInventoryService.removeItem(userId, id);
	}
}
