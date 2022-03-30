import {Body, Controller, Get, Post, Req, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {ProductsService} from "./products.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateProductDto} from "./dto/create-product.dto";
import {VerifyJwtGuard} from "../auth/auth.guard";

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly authService: AuthService, private readonly productService:ProductsService) {
    }
    
    @ApiOperation({summary: 'Get all product'})
    @Get()
    getAllProduct(): string {
        return 'Hello, this is Product Module'
    }
    
    @UseGuards(JwtAuthGuard)
    @UseGuards(VerifyJwtGuard)
    @ApiOperation({summary: 'Create product'})
    @Post()
    async createProduct(@Body() req: CreateProductDto){
        await this.productService.createProduct(req);
    }
}
