import { ImageModule } from '@api/image/image.module';
import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
	controllers: [ItemController],
	providers: [ItemService],
	imports: [ImageModule],
	exports: [ItemService],
})
export class ItemModule {}
