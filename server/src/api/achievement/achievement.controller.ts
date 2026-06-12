import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { LanguageQueryDto } from '@libs/dto/language-query.dto';
import { ImageValidationPipe } from '@libs/pipes/image-validation.pipe';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Delete,
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
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AchievementDto, FullAchievementDto } from './dto/achievement.dto';
import {
	CreateAchievementDto,
	CreateAchievementSwaggerDto,
} from './dto/create-achievement.dto';
import {
	UpdateAchievementDto,
	UpdateAchievementSwaggerDto,
} from './dto/update-achievement.dto';
import { UserAchievementDto } from './dto/user-achievement.dto';
import { AchievementCrudService } from './services/achievement-crud.service';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementController {
	constructor(private readonly achievementService: AchievementCrudService) {}

	/**
	 * Get user's achievements
	 *
	 * @remarks Get all achievements for the authenticated user, with optional language parameter for localization.
	 */
	@Get('me')
	@Auth()
	@ApiOkResponse({ type: [UserAchievementDto] })
	public async getAchievements(
		@Authorized('id') userId: string,
		@Query() query: LanguageQueryDto,
	): Promise<UserAchievementDto[]> {
		return await this.achievementService.getAllAchievements(
			userId,
			query.language,
		);
	}

	/** Create a new achievement */
	@Post()
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: CreateAchievementSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@ApiCreatedResponse({ type: AchievementDto })
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.IMAGE.PROCESSING_FAILED,
	)
	public async createAchievement(
		@UploadedFile(ImageValidationPipe()) icon: Express.Multer.File,
		@Body() dto: CreateAchievementDto,
	): Promise<AchievementDto> {
		return await this.achievementService.createAchievement(dto, icon);
	}

	/**
	 * Get all achievements (admin only)
	 *
	 * @remarks Get all achievements without user-specific data. Admin only.
	 */
	@Get('all')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: [AchievementDto] })
	public async getAllAchievementsForAdmin(): Promise<AchievementDto[]> {
		return await this.achievementService.getAllAchievementsForAdmin();
	}

	/** Get achievement by ID */
	@Get('id/:id')
	@Auth(UserRole.ADMIN)
	@ApiOkResponse({ type: FullAchievementDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND)
	public async getAchievementById(
		@Param('id') id: string,
	): Promise<FullAchievementDto> {
		return await this.achievementService.getAchievementById(id);
	}

	/** Update an achievement */
	@Patch(':id')
	@Auth(UserRole.ADMIN)
	@ApiBody({ type: UpdateAchievementSwaggerDto })
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(FileInterceptor('icon'))
	@ApiOkResponse({ type: FullAchievementDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND)
	public async updateAchievement(
		@Param('id') id: string,
		@UploadedFile(ImageValidationPipe(5, false)) icon: Express.Multer.File,
		@Body() dto: UpdateAchievementDto,
	): Promise<FullAchievementDto> {
		return await this.achievementService.updateAchievement(id, dto, icon);
	}

	/** Delete an achievement */
	@Delete(':id')
	@Auth(UserRole.ADMIN)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.ACHIEVEMENT.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.ACHIEVEMENT.NOT_FOUND)
	public async deleteAchievement(
		@Param('id') id: string,
	): Promise<MessageResponse> {
		return await this.achievementService.deleteAchievement(id);
	}
}
