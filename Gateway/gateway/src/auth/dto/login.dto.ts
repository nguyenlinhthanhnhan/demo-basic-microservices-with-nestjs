import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    accountName: string

    @ApiProperty()
    password: string
}