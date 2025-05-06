import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


enum Role{
  admin='admin',
  user='user'
}


export type UserType = HydratedDocument<User>


@Schema()
export class User {

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({enum: Role, default: Role.user})
  role: Role

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User)


