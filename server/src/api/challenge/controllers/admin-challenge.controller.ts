import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChallengeQueryDto } from '../dto/challenge-query.dto';
import { FullChallengeDto } from '../dto/challenge.dto';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { BedtimeVarianceMetadataDto } from '../dto/metadata/bedtime-variance-metadata.dto';
import { SleepDurationMetadataDto } from '../dto/metadata/sleep-duration-metadata.dto';
import { TimeConsistencyMetadataDto } from '../dto/metadata/time-consistency-metadata.dto';
import { PaginatedChallengesDto } from '../dto/paginated-challenges.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';
import { AdminChallengeService } from '../services/admin-challenge.service';
import { ChallengeGeneratorService } from '../services/challenge-generator.service';

@Auth(UserRole.ADMIN)
@ApiTags('Admin Challenge')
@ApiExtraModels(
	SleepDurationMetadataDto,
	TimeConsistencyMetadataDto,
	BedtimeVarianceMetadataDto,
)
@Controller('admin/challenges')
export class AdminChallengeController {
	constructor(
		private readonly adminChallengeService: AdminChallengeService,
		private readonly challengeGeneratorService: ChallengeGeneratorService,
	) {}

	/** Get all challenges */
	@Get()
	@ApiOkResponse({ type: PaginatedChallengesDto })
	public async findAll(
		@Query() query: ChallengeQueryDto,
	): Promise<PaginatedChallengesDto> {
		return await this.adminChallengeService.findAll(query);
	}

	/** Get challenge by id */
	@Get(':id')
	@ApiOkResponse({ type: FullChallengeDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	public async findById(@Param('id') id: string): Promise<FullChallengeDto> {
		return await this.adminChallengeService.findById(id);
	}

	/** Create challenge */
	@Post()
	@ApiOkResponse({ type: FullChallengeDto })
	public async create(
		@Body() dto: CreateChallengeDto,
	): Promise<FullChallengeDto> {
		return await this.adminChallengeService.create(dto);
	}

	/** Update challenge */
	@Patch(':id')
	@ApiOkResponse({ type: FullChallengeDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.CHALLENGE.TYPE_CANNOT_BE_CHANGED,
	)
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateChallengeDto,
	): Promise<FullChallengeDto> {
		return await this.adminChallengeService.update(id, dto);
	}

	/** Regenerate challenge */
	@Post(':id/regenerate')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.CHALLENGE.REGENERATED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@HttpCode(HttpStatus.OK)
	public async regenerateChallenge(
		@Param('id') id: string,
	): Promise<MessageResponse> {
		await this.challengeGeneratorService.regenerateChallenge(id);

		return SUCCESS_MESSAGES.CHALLENGE.REGENERATED;
	}

	/** Delete challenge */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.CHALLENGE.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	public async delete(@Param('id') id: string): Promise<MessageResponse> {
		await this.adminChallengeService.delete(id);

		return SUCCESS_MESSAGES.CHALLENGE.DELETED;
	}
}
