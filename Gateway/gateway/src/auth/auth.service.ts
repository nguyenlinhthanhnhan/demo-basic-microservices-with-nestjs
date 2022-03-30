import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {LoginDto} from "./dto/login.dto";
import {ReturnUserDto} from "./dto/return-user.dto";
import {map, Observable} from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){
    }

    validateUserCredentials(username: string, password: string): Observable<any> {
        return this.usersService.checkAccount({accountName: username, password: password}).pipe(
            map(res => res.data)
        );
    }

    async loginWithCredentials(user: any) {
        console.log('loginWithCredentials', user)
        const payload = { username: user.accountName, sub: user.id};
        console.log(payload)
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
