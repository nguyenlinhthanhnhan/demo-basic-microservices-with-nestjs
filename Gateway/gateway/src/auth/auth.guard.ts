import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable,Subject,from, tap,switchMap,AsyncSubject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class CheckJwtGuard implements CanActivate{
    constructor(private authService: AuthService) {
    }
    subject: any;

    canActivate(context:ExecutionContext): boolean | Observable<boolean> | Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        console.log('request', request.body)
        let result = {};
        return new Promise<void>((resolve, reject) =>{
            this.authService.validateUserCredentials(request.body.accountName, request.body.password) .subscribe((res)=>{
                resolve();
                result = {...res};
            })
        }).then((res) =>{
            request.body.id = result['_id']
            console.log('result',result)
            return !!Object.keys(result).length;
            
        })
    }
}