import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";


export type NoteDocument = HydratedDocument<Note>


@Schema({timestamps: true})
export class Note{
  @Prop()
  title: string;
  
  @Prop()
  content: string;

  @Prop({ref: 'User', type: mongoose.Types.ObjectId, required: true})
  user: User;

}


export const NoteSchema = SchemaFactory.createForClass(Note)
