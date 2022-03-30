import {Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {CheckUserDto} from "./dto/check-user.dto";
import {ReturnUserDto} from "./dto/return-user.dto";

@ApiTags('users-services')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Users created' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find an user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Get(':accountName')
  findOne(@Param('accountName') accountName: string) {
    return this.usersService.findOne(accountName);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Patch(':accountName')
  update(@Param('accountName') accountName: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(accountName, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove an user' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':accountName')
  remove(@Param('accountName') accountName: string) {
    return this.usersService.remove(accountName);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'OK' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('/login')
  async checkAccount(@Body() account: CheckUserDto):Promise<ReturnUserDto>{
    const user = await this.usersService.findAccount(account.accountName, account.password)
    return <ReturnUserDto>user
  }
}
