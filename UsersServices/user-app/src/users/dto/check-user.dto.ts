import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role.enum";

export class CheckUserDto {
    @ApiProperty()
    accountName: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role:Role
}
