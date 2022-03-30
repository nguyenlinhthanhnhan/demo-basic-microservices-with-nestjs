import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {LoginDto} from "./auth/dto/login.dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CheckJwtGuard} from "./auth/auth.guard";

@ApiTags('home')
@Controller()
export class AppController {
    constructor(private readonly authService: AuthService) {
    }

    @Get()
    getHello(): string {
        return 'Hello, this is Gateway service'
    }
}
