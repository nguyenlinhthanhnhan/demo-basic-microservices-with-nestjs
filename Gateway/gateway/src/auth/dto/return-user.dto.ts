import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role.enum";

export class ReturnUserDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    accountName: string

    @ApiProperty({enum: Role})
    roles:Role[]
}