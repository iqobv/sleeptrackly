import { UserRole } from '@generated/prisma/enums';
import { Auth, Authorized } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import { ImageValidationPipe } from '@libs/pipes';
import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBody,
	ApiConsumes,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import {
	AchievementDto,
	CreateAchievementDto,
	CreateAchievementSwaggerDto,
	UpdateAchievementDto,
	UpdateAchievementSwaggerDto,
	UserAchievementDto,
} from './dto';
import { AchievementCrudService } from './services/achievement-crud.service';

@Controller('achievements')
export class AchievementController {
	constructor(private readonly achievementService: AchievementCrudService) {}

	@Auth()
	@ApiOperation({ summary: 'Get all achievements for the authenticated user' })
	@ApiOkResponse({ type: [UserAchievementDto] })
	@Get('me')
	async getAchievements(
		@Authorized('id') userId: string,
		@Query() query: LanguageQueryDto,
	) {
		return await this.achievementService.getAllAchievements(
			userId,
			query.language,
		);
	}

	@Auth(UserRole.ADMIN)
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@ApiBody({ type: CreateAchievementSwaggerDto })
	@Post()
	async createAchievement(
		@UploadedFile(ImageValidationPipe()) icon: Express.Multer.File,
		@Body() dto: CreateAchievementDto,
	) {
		return await this.achievementService.createAchievement(dto, icon);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get all achievements for admin view' })
	@ApiOkResponse({ type: [AchievementDto] })
	@Get('all')
	async getAllAchievementsForAdmin() {
		return await this.achievementService.getAllAchievementsForAdmin();
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Get achievement by ID' })
	@ApiOkResponse({ type: AchievementDto })
	@ApiNotFoundResponse({ description: 'Achievement not found' })
	@Get('id/:id')
	async getAchievementById(@Param('id') id: string) {
		return await this.achievementService.getAchievementById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Update achievement' })
	@ApiOkResponse({ type: AchievementDto })
	@ApiNotFoundResponse({ description: 'Achievement not found' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@ApiBody({ type: UpdateAchievementSwaggerDto })
	@Patch(':id')
	async updateAchievement(
		@Param('id') id: string,
		@UploadedFile(ImageValidationPipe(5, false)) icon: Express.Multer.File,
		@Body() dto: UpdateAchievementDto,
	) {
		return await this.achievementService.updateAchievement(id, dto, icon);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Delete achievement' })
	@ApiOkResponse({ example: { message: 'Achievement deleted successfully' } })
	@ApiNotFoundResponse({ description: 'Achievement not found' })
	@Get(':id')
	async deleteAchievement(@Param('id') id: string) {
		return await this.achievementService.deleteAchievement(id);
	}
}
