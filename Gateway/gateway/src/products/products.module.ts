import {Module} from '@nestjs/common';
import {ProductsService} from './products.service';
import {ProductsController} from './products.controller';
import {AuthModule} from "../auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../auth/constants";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [AuthModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '60s'}
    }), HttpModule],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule {
}
