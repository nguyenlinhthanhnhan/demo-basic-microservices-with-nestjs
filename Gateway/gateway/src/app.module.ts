import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {ProductsModule} from './products/products.module';
import {InjectSecretKeyMiddleware} from "./middlewares/inject-secret-key.middleware";
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./auth/role.guard";

@Module({
    imports: [AuthModule, UsersModule, ConfigModule.forRoot(), ProductsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(InjectSecretKeyMiddleware).forRoutes('*');
    }
}
