import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {LoginDto} from "./auth/dto/login.dto";
import {ApiOperation} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {CheckJwtGuard} from "./auth/auth.guard";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return 'Hello, this is Gateway service'
  }
  
  @ApiOperation({summary: 'Login'})
  @UseGuards(CheckJwtGuard)
  @Post()
  async login(@Body() req: LoginDto){
    console.log('req', req)
    return await this.authService.loginWithCredentials(req)
  }
}
