import {Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseGuards, Request} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {FilterProductDto} from "./dto/filter-product.dto";
import {NonPublicApi} from "../auth/auth.guard";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(NonPublicApi)
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiOperation({ summary: 'Create product' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Find all products' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  findAll(@Query() inputFilter: FilterProductDto) {
    return this.productsService.findAll(inputFilter);
  }

  @ApiOperation({ summary: 'Get one product' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remove a product' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
