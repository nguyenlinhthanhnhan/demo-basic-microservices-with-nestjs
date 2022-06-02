import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {Role} from "../role.enum";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    name: string;

    @Prop({required: true})
    accountName: string;

    @Prop({required: true})
    password: string;
    
    @Prop({required:true})
    roles:Role[]
    
    @Prop()
    salt: string
}

export const UserSchema = SchemaFactory.createForClass(User)