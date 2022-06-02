import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CheckJwtGuard} from "./auth.guard";
import {LoginDto} from "./dto/login.dto";

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Get()
    getHello(): string {
        return 'Hello, this is Gateway service'
    }

    @ApiOperation({summary: 'Login'})
    @UseGuards(CheckJwtGuard)
    @Post()
    async login(@Body() req: LoginDto) {
        return await this.authService.loginWithCredentials(req)
    }
}
