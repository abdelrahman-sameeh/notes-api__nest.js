import { Module, ValidationPipe } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [DatabaseModule, NotesModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule { }




