import { Module } from '@nestjs/common';
import { NoteModule } from './notes/note.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, NoteModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
