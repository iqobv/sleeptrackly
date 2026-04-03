import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/libs/decorators';
import { CreatePromotionDto, PromotionDto, UpdatePromotionDto } from './dto';
import { PromotionService } from './promotion.service';

@Controller('promotions')
export class PromotionController {
	constructor(private readonly promotionService: PromotionService) {}

	@ApiOperation({ summary: 'Create a new promotion' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Post()
	async createPromotion(@Body() dto: CreatePromotionDto) {
		return await this.promotionService.createPromotion(dto);
	}

	@ApiOperation({ summary: 'Get all active promotions' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Get()
	async getAllActivePromotions() {
		return await this.promotionService.getAllActivePromotions();
	}

	@ApiOperation({ summary: 'Get all active promotions' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Get('alias/:alias')
	async getPromotionByAlias(@Param('alias') alias: string) {
		return await this.promotionService.getPromotionByAlias(alias);
	}

	@ApiOperation({ summary: 'Get all active promotions' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Get('id/:id')
	async getPromotionById(@Param('id') id: string) {
		return await this.promotionService.getPromotionById(id);
	}

	@ApiOperation({ summary: 'Update an existing promotion' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Patch(':id')
	async updatePromotion(
		@Param('id') id: string,
		@Body() dto: UpdatePromotionDto,
	) {
		return await this.promotionService.updatePromotion(id, dto);
	}

	@ApiOperation({ summary: 'Delete a promotion' })
	@Auth('ADMIN')
	@ApiOkResponse({ type: PromotionDto })
	@Delete(':id')
	async deletePromotion(@Param('id') id: string) {
		return await this.promotionService.deletePromotion(id);
	}
}
