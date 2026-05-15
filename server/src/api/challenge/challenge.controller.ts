import { Auth, Authorized } from '@libs/decorators';
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
} from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import {
	ChallengeDto,
	ChallengeFullDto,
	CreateChallengeDto,
	UpdateChallengeDto,
} from './dto';

@Controller('challenges')
export class ChallengeController {
	constructor(private readonly challengeService: ChallengeService) {}

	@ApiOperation({ summary: 'Create challenge' })
	@ApiCreatedResponse({ type: ChallengeDto })
	@ApiBadRequestResponse({
		description: `Start date cannot be in the past<br/>
		End date cannot be in the past<br/>
		End date cannot be before start date`,
	})
	@Auth()
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateChallengeDto,
	) {
		return this.challengeService.create(userId, dto);
	}

	@ApiOperation({ summary: 'Get all challenges' })
	@ApiOkResponse({ type: [ChallengeDto] })
	@Auth()
	@Get('me')
	async findAll(@Authorized('id') userId: string) {
		return this.challengeService.findAll(userId);
	}

	@ApiOperation({ summary: 'Get challenge by id' })
	@ApiOkResponse({ type: ChallengeFullDto })
	@ApiNotFoundResponse({ description: 'Challenge not found' })
	@Auth()
	@Get(':id')
	async findById(@Authorized('id') userId: string, @Param('id') id: string) {
		return this.challengeService.findById(id, userId);
	}

	@ApiOperation({ summary: 'Update challenge' })
	@ApiOkResponse({ type: UpdateChallengeDto })
	@ApiNotFoundResponse({ description: 'Challenge not found' })
	@Auth()
	@Patch(':id')
	async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateChallengeDto,
	) {
		return await this.challengeService.update(id, userId, dto);
	}

	@ApiOperation({ summary: 'Delete challenge' })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiNotFoundResponse({ description: 'Challenge not found' })
	@Auth()
	@Delete(':id')
	async remove(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.challengeService.remove(id, userId);
	}
}
