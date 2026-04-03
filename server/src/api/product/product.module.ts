import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	exports: [ProductService],
	providers: [ProductService],
})
export class ProductModule {}
