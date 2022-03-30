import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {jwtConstants} from "./constants";
import {AuthService} from "./auth.service";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService:AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:jwtConstants.secret
        });
    }

    async validate(payload:any){
        console.log('payload', payload)
        return {userId: payload.sub, username:payload.username}
    }
}