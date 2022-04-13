import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot(), ConfigModule.forRoot()], // In ormConfig.json, please remove "synchronize": true in production, if not, data will be loss
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
