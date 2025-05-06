import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { WrapResponseInterceptor } from "src/common/interceptors/wrap-response.interceptor";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { AuthGuard } from "src/common/guards/is-auth.guard";
import { User } from "src/auth/entities/user.entity";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";

@UseInterceptors(WrapResponseInterceptor)
@UseGuards(AuthGuard)
@Controller("notes")
export class NotesController {

  constructor(private readonly notesService: NotesService) { }

  @Post()
  @Roles("admin")
  create(@Body() CreateNoteDto: CreateNoteDto, @Req() request) {
    const user: User = request.user
    CreateNoteDto['user'] = user.id
    return this.notesService.create(CreateNoteDto)
  }

  @Get()
  findAll(@Req() request) {
    const user = request.user
    return this.notesService.findAll(user)
  }


  @Get(":id")
  findOne(@Param("id", ParseUUIDPipe) id: string, @Req() request) {
    const user = request.user
    return this.notesService.findOne(id, user)
  }


  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOne(@Param("id", ParseUUIDPipe) id: string, @Req() request) {
    const user = request.user
    return this.notesService.deleteOne(id, user)
  }


  @Patch(":id")
  updateOne(@Param("id", ParseUUIDPipe) id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() request) {
    const user = request.user
    return this.notesService.updateOne(id, updateNoteDto, user)
  }
}

