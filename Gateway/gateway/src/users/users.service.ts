import {Injectable, Res} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, Observable} from 'rxjs';
import {AxiosResponse} from "axios";
import {LoginDto} from "../auth/dto/login.dto";
import {ReturnUserDto} from "../auth/dto/return-user.dto";


@Injectable()
export class UsersService {
    constructor(
        private httpService:HttpService
    ){
        
    }
    
    checkAccount(user:LoginDto): Observable<AxiosResponse<ReturnUserDto>>{
        return this.httpService.post('http://localhost:3001/users/login', user)
    }
}
