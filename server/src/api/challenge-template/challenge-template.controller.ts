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
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChallengeTemplateService } from './challenge-template.service';
import { ChallengeTemplateDto } from './dto/challenge-template.dto';
import { ChallengeTemplateQueryDto } from './dto/challenge-templates-query.dto';
import { CreateChallengeTemplateDto } from './dto/create-challenge-template.dto';
import { GenerationBedtimeVarianceMetadataDto } from './dto/metadata/bedtime-variance.dto';
import { GenerationSleepDurationMetadataDto } from './dto/metadata/sleep-duration.dto';
import { GenerationTimeConsistencyMetadataDto } from './dto/metadata/time-consistency.dto';
import { PaginatedChallengeTemplatesDto } from './dto/paginated-challenge-teplates.dto';
import { UpdateChallengeTemplateDto } from './dto/update-challenge-template.dto';

@ApiExtraModels(
	GenerationBedtimeVarianceMetadataDto,
	GenerationSleepDurationMetadataDto,
	GenerationTimeConsistencyMetadataDto,
)
@Auth(UserRole.ADMIN)
@ApiTags('Challenge Templates')
@Controller('challenge-templates')
export class ChallengeTemplateController {
	constructor(
		private readonly challengeTemplateService: ChallengeTemplateService,
	) {}

	/** Find all challenge templates */
	@Get()
	@ApiOkResponse({ type: PaginatedChallengeTemplatesDto })
	public async findAll(
		@Query() query: ChallengeTemplateQueryDto,
	): Promise<PaginatedChallengeTemplatesDto> {
		return await this.challengeTemplateService.findAll(query);
	}

	/** Find a challenge template by ID */
	@Get(':id')
	@ApiOkResponse({ type: ChallengeTemplateDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE_TEMPLATE.NOT_FOUND,
	)
	public async findById(
		@Param('id') id: string,
	): Promise<ChallengeTemplateDto> {
		return await this.challengeTemplateService.findById(id);
	}

	/** Create a new challenge template */
	@Post()
	@ApiOkResponse({ type: ChallengeTemplateDto })
	public async create(
		@Body() dto: CreateChallengeTemplateDto,
	): Promise<ChallengeTemplateDto> {
		return await this.challengeTemplateService.create(dto);
	}

	/** Update a challenge template by ID */
	@Patch(':id')
	@ApiOkResponse({ type: ChallengeTemplateDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE_TEMPLATE.NOT_FOUND,
	)
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.CHALLENGE_TEMPLATE.TYPE_CANNOT_BE_CHANGED,
	)
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateChallengeTemplateDto,
	): Promise<ChallengeTemplateDto> {
		return await this.challengeTemplateService.update(id, dto);
	}

	/** Delete a challenge template by ID */
	@Delete(':id')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.CHALLENGE_TEMPLATE.DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE_TEMPLATE.NOT_FOUND,
	)
	public async delete(@Param('id') id: string): Promise<MessageResponse> {
		await this.challengeTemplateService.delete(id);

		return SUCCESS_MESSAGES.CHALLENGE_TEMPLATE.DELETED;
	}
}
