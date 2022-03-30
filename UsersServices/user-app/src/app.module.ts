import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/microservice-users'), ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
