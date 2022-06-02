import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role.enum";

export class CreateUserDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    accountName: string;
    
    @ApiProperty()
    password: string;
    
    @ApiProperty({enum: Role})
    role:Role
}
