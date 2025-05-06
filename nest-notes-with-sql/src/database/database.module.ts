import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { Note } from "src/notes/entities/note.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: "P@ssw0rd",
      database: "notes",
      synchronize: true,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([Note, User])
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule{}
