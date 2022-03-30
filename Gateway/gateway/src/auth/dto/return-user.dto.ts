import {ApiProperty} from "@nestjs/swagger";

export class ReturnUserDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    accountName: string
}