import {Body, Controller, Get, Param, Post, Query, Req, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "../auth/auth.service";
import {ProductsService} from "./products.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateProductDto} from "./dto/create-product.dto";
import {VerifyJwtGuard} from "../auth/auth.guard";
import {FilterProductDto} from "./dto/filter-product.dto";

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly authService: AuthService, private readonly productService:ProductsService) {
    }
    
    @UseGuards(JwtAuthGuard)
    @UseGuards(VerifyJwtGuard)
    @ApiOperation({summary: 'Create product'})
    @Post()
    async createProduct(@Body() req: CreateProductDto){
        await this.productService.createProduct(req);
    }
    
    @UseGuards(JwtAuthGuard)
    @UseGuards(VerifyJwtGuard)
    @ApiOperation({summary: "Get products belong to the user"})
    @Get()
    async findProductBelongToUser(@Query() inputFilter:FilterProductDto, @Request() req){
        inputFilter.userId = req.body.userId
        const res = await this.productService.findProduct(inputFilter)
        return res.data
    }
}
