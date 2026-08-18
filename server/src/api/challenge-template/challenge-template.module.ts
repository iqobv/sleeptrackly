import { Module } from '@nestjs/common';
import { ChallengeTemplateService } from './challenge-template.service';
import { ChallengeTemplateController } from './challenge-template.controller';

@Module({
  controllers: [ChallengeTemplateController],
  providers: [ChallengeTemplateService],
})
export class ChallengeTemplateModule {}
