import { ImageModule } from '@api/image/image.module';
import { Module } from '@nestjs/common';
import { BundleController } from './bundle.controller';
import { BundleService } from './bundle.service';

@Module({
	controllers: [BundleController],
	providers: [BundleService],
	exports: [BundleService],
	imports: [ImageModule],
})
export class BundleModule {}
