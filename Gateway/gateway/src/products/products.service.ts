import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {HttpService} from "@nestjs/axios";
import {LoginDto} from "../auth/dto/login.dto";
import {concatMap, firstValueFrom, Observable, of} from "rxjs";
import {AxiosResponse} from "axios";
import {ReturnUserDto} from "../auth/dto/return-user.dto";
import {CreateProductDto} from "./dto/create-product.dto";
import {FilterProductDto} from "./dto/filter-product.dto";

@Injectable()
export class ProductsService {
    constructor(
        private httpService: HttpService
    ) {

    }

    createProduct(product: CreateProductDto): Promise<void> {
        this.httpService.post('http://localhost:3002/products', product).subscribe(x=>x)
        return
    }
    
    async findProduct(inputFilter:FilterProductDto):Promise<any>{
        return await firstValueFrom(this.httpService.get('http://localhost:3002/products', {params:{...inputFilter}}))
    }
}
