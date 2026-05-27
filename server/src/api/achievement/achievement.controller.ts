import { UserRole } from '@generated/prisma/enums';
import { Auth, Authorized } from '@libs/decorators';
import { LanguageQueryDto } from '@libs/dto';
import {
	Body,
	Controller,
	FileTypeValidator,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
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

const parsePipe = new ParseFilePipe({
	validators: [
		new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
		new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif|webp|webm)' }),
	],
});

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
		@UploadedFile(parsePipe) icon: Express.Multer.File,
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
		@UploadedFile(parsePipe) icon: Express.Multer.File,
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
