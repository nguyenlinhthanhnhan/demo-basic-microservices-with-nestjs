import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository, Like} from 'typeorm'
import {FilterProductDto} from "./dto/filter-product.dto";

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

  findAll(inputFilter: FilterProductDto) {
    const listObjKeys = Object.keys(inputFilter)
    if(listObjKeys.length > 0){
      const filterObj = {};
      for(let i = 0; i<listObjKeys.length; i++){
        filterObj[`${listObjKeys[i]}`] = Like(`%${inputFilter[`${listObjKeys[i]}`]}%`)
      }
      return this.productRepository.find({where: {...filterObj}});  
    }
    return this.productRepository.find()
  }

  findOne(id: any) {
    return this.productRepository.findOne(id)
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto)
  }

  async remove(id: any) {
    const objToRemove = await this.productRepository.findOne(id)
    return this.productRepository.softRemove(objToRemove)
  }
}
