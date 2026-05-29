import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import { ImageValidationPipe } from '@libs/pipes';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
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
	@ApiOperation({ summary: 'Create a new achievement' })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.IMAGE.PROCESSING_FAILED,
	)
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
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND)
	@Get('id/:id')
	async getAchievementById(@Param('id') id: string) {
		return await this.achievementService.getAchievementById(id);
	}

	@Auth(UserRole.ADMIN)
	@ApiOperation({ summary: 'Update achievement' })
	@ApiOkResponse({ type: AchievementDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND)
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
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND)
	@Get(':id')
	async deleteAchievement(@Param('id') id: string) {
		return await this.achievementService.deleteAchievement(id);
	}
}
