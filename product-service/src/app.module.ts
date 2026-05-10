import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://root:rootpassword@localhost:27017/product_db?authSource=admin'),
    ProductModule,
  ],
})
export class AppModule {}
