import { forwardRef, Module } from '@nestjs/common';
import { ItemModule } from '../item.module';
import { BundleController } from './bundle.controller';
import { BundleService } from './bundle.service';

@Module({
	controllers: [BundleController],
	providers: [BundleService],
	imports: [forwardRef(() => ItemModule)],
})
export class BundleModule {}
