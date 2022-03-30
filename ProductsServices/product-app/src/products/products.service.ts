import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository} from 'typeorm'

@Injectable()
export class ProductsService {
  constructor(
      @InjectRepository(Product)
      private productRepository: Repository<Product>
  ){
    
  }
  
  create(createProductDto: CreateProductDto) {
    const obj = this.productRepository.create(createProductDto)
    return this.productRepository.save(obj)
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne(id)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto)
  }

  async remove(id: number) {
    const objToRemove = await this.productRepository.findOne(id)
    return this.productRepository.softRemove(objToRemove)
  }
}
