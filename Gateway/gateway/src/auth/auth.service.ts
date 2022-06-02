import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    validateUserCredentials(username: string, password: string): Observable<any> {
        return this.usersService.checkAccount({accountName: username, password: password})
    }

    async loginWithCredentials(user: any) {
        const payload = {username: user.accountName, sub: user.id, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
