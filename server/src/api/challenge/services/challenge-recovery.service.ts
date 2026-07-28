import { ChallengeStatus, ChallengeTaskStatus } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ChallengeRecoveryService {

}
