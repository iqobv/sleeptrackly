import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../../auth.module';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';

@Module({
	controllers: [GoogleController],
	imports: [forwardRef(() => AuthModule)],
	providers: [GoogleService],
})
export class GoogleModule {}
