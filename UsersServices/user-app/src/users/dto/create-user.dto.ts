import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    accountName: string;
    
    @ApiProperty()
    password: string;
}
