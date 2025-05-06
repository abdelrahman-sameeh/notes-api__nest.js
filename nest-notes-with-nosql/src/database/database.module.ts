import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "src/notes/schemas/note.schema";
import { User, UserSchema } from "src/user/schemas/user.schema";


@Global()
@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/notes"),
    // schemas
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  exports: [MongooseModule]
})
export class DatabaseModule { }
