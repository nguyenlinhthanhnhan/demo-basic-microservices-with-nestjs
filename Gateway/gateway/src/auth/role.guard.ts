import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Role} from "./role.enum";
import {ROLES_KEY} from "./roles.decorator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService:JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (!requiredRoles) {
            return true;
        }
        
        const request = context.switchToHttp().getRequest();
        const jwtToken:string = request.rawHeaders[1];
        const roleFromDecodedJwt = this.jwtService.decode(jwtToken.split(' ')[1])['roles']
        
        const checker = (arr1, arr2) => arr2.every(x=>arr1.includes(x))
        return !!checker(requiredRoles, roleFromDecodedJwt);

    }
}