import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { Auth, Authorized } from 'src/libs/decorators';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto, UpdateChallengeDto } from './dto';

@Controller('challenges')
export class ChallengeController {
	constructor(private readonly challengeService: ChallengeService) {}

	@Auth()
	@Post()
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateChallengeDto,
	) {
		return this.challengeService.create(userId, dto);
	}

	@Auth()
	@Get('me')
	async findAll(@Authorized('id') userId: string) {
		return this.challengeService.findAll(userId);
	}

	@Auth()
	@Get(':id')
	async findById(@Authorized('id') userId: string, @Param('id') id: string) {
		return this.challengeService.findById(id, userId);
	}

	@Auth()
	@Patch(':id')
	async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateChallengeDto,
	) {
		return await this.challengeService.update(id, userId, dto);
	}

	@Delete(':id')
	async remove(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.challengeService.remove(id, userId);
	}
}
