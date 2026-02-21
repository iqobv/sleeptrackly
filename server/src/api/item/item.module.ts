import { Module } from '@nestjs/common';
import { BundleModule } from './bundle/bundle.module';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
	controllers: [ItemController],
	providers: [ItemService],
	imports: [BundleModule],
	exports: [ItemService],
})
export class ItemModule {}
