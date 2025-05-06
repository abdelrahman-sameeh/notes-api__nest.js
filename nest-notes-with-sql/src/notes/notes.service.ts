import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./entities/note.entity";
import { Repository } from "typeorm";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { User } from "src/auth/entities/user.entity";

@Injectable()
export class NotesService {

  constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>) { }

  async create(createNoteDto: CreateNoteDto) {
    return await this.noteRepository.save(createNoteDto)
  }

  async findAll(user: User) {
    return await this.noteRepository
      .createQueryBuilder("note")
      .leftJoinAndSelect('note.user', 'user')
      .where('user.id = :userId', { userId: user.id })
      .select(['note', 'user.id', 'user.name', 'user.email'])
      .getMany()
  }

  async findOne(id: string, user: User): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id, user: { id: user.id } } })
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not exist`)
    }
    return note
  }


  async deleteOne(id: string, user: User): Promise<any> {
    const result = await this.noteRepository.delete({ id, user: { id: user.id } })
    if (result.affected == 0) {
      throw new NotFoundException(`Note with ID ${id} not exist`)
    }
    return
  }

  async updateOne(id: string, updateNoteDto: UpdateNoteDto, user: User): Promise<Note> {
    const result = await this.noteRepository.update({ id, user: { id: user.id } }, updateNoteDto)
    if (result.affected == 0) {
      throw new NotFoundException(`Note with ID ${id} not exist`)
    }
    return await this.noteRepository.findOne({ where: { id } })
  }

}


