import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { Note } from "./schemas/note.schema";
import { WrapResponseInterceptor } from "src/common/interceptor/wrap-response.interceptor";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { AuthGuard } from "src/common/guards/is-auth.guard";
import { UserType } from "src/user/schemas/user.schema";


@Controller("notes")
@UseInterceptors(WrapResponseInterceptor)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() request: any, @Body() createNoteDto: CreateNoteDto): Promise<Note | any> {
    createNoteDto['user'] = (request.user as UserType).id
    return await this.noteService.create(createNoteDto)
  }

  @Get()
  async find(@Query() query: string): Promise<Note[]> {
    return await this.noteService.find(query)
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
    return await this.noteService.update(id, updateNoteDto)
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Note> {
    return this.noteService.findOne(id)
  }


  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param("id") id: string): Promise<void> {
    return await this.noteService.deleteOne(id)
  }

}
