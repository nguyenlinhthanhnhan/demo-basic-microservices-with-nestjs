import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.stragety";
import {AuthController} from './auth.controller';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "./role.guard";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '600s'}
        })
    ],
    providers: [AuthService, JwtStrategy, {provide: APP_GUARD, useClass: RolesGuard}],
    exports: [AuthService],
    controllers: [AuthController],

})
export class AuthModule {
}
