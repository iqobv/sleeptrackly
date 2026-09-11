import { ImageModule } from '@api/image/image.module';
import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';

@Module({
	controllers: [CollectionController],
	providers: [CollectionService],
	imports: [ImageModule],
})
export class CollectionModule {}
