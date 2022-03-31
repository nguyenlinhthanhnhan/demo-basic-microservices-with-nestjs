import {ApiProperty} from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    amount: number

    @ApiProperty({nullable:true})
    userId: string
}
