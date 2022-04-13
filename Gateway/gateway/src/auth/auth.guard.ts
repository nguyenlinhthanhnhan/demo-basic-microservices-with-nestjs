import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class CheckJwtGuard implements CanActivate {
    constructor(private authService: AuthService, private jwtService:JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        let result:any;
        return new Promise<void>((resolve, reject) => {
            this.authService.validateUserCredentials(request.body.accountName, request.body.password).subscribe((res) => {
                resolve();
                result = {...res};
            })
        }).then((res) => {
            request.body.id = result.data._id
            return request.body.id != undefined;
        })

        // Huy's playground below

        // this.authService.validateUserCredentials(request.body.accountName, request.body.password).pipe(
        //     tap((res) => {
        //         result = {...res.data}
        //         console.log('result data', result)
        //     })
        // ).subscribe((res)=> {
        //     return  result = {...res.data};
        // });
        // console.log('result',result);
        // return !!Object.keys(result).length;
    }
}

@Injectable()
export class VerifyJwtGuard implements CanActivate {
    constructor(private jwtService:JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Observable<boolean> | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwtToken:string = request.rawHeaders[1];
        const decodedJwt = this.jwtService.decode(jwtToken.split(' ')[1])
        const userId = decodedJwt?.sub
        request.body.userId = userId
        if(request.url.includes('?')) {
            request.url = `${request.url}&userId=${userId}`
        }
        return true
    }
}