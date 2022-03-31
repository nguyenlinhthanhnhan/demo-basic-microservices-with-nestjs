import {ApiProperty} from "@nestjs/swagger";

export class FilterProductDto {
    @ApiProperty({nullable:true})
    name?: string

    @ApiProperty({nullable:true})
    userId?: string
}
