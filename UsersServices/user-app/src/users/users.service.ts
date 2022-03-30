import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./entities/user.entity";
import {Model, Schema} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {CheckUserDto} from "./dto/check-user.dto";
import {ReturnUserDto} from "./dto/return-user.dto";

@Injectable()
export class UsersService {
  constructor(
      @InjectModel(User.name)
      private userModel: Model<UserDocument>
  ){
    
  }
  
  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(+process.env.SALTROUND)
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt)
    const createdUser = new this.userModel(createUserDto)
    createdUser.salt = salt
    return createdUser.save()
  }

  findAll() {
    return this.userModel.find().exec()
  }

  findOne(accountName: string) {
    return this.userModel.findOne({accountName: accountName}).exec()
  }

  update(accountName: string, updateUserDto: UpdateUserDto) {
    return this.userModel.replaceOne({accountName:accountName}, updateUserDto)
  }

  remove(accountName: string) {
    return this.userModel.deleteOne({accountName: accountName})
  }
  
  async findAccount(accountName:string, password:string):Promise<ReturnUserDto>{
    let user = await this.userModel.findOne({accountName:accountName}).exec()
    if(user){
      const salt = user.salt
      if((await bcrypt.hash(password, salt)) === user.password){
        return <ReturnUserDto>user
      }  
    }
    return <ReturnUserDto>null
  }
}
