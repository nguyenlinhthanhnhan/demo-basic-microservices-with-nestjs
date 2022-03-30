import {ApiProperty} from "@nestjs/swagger";

export class CheckUserDto {
    @ApiProperty()
    accountName: string;

    @ApiProperty()
    password: string;
}
