import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Note } from "./schemas/note.schema";
import { Model } from "mongoose";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { QueryBuilder } from "src/common/helper/query-builder.helper";



@Injectable()
export class NoteService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) { }


  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = await this.noteModel.create(createNoteDto);
    return newNote.toObject()
  }


  async find(query: string): Promise<Note[]> {
    const queryBuilder = new QueryBuilder(query)
      .searchable("content")
      .filterable()
      .sortable()
      .paginate()
      .build()

    return await this.noteModel.find(queryBuilder.filter).limit(queryBuilder.limit).sort(queryBuilder.sort).skip(queryBuilder.skip)
  }


  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true })
    if (!note) {
      throw new NotFoundException(`note with id=>${id} not found`)
    }
    return note.toObject()
  }


  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id)
    if (!note) {
      throw new NotFoundException()
    }
    return note.toObject()
  }


  async deleteOne(id: string): Promise<void> {
    const note = await this.noteModel.findByIdAndDelete(id)
    if (!note) {
      throw new NotFoundException()
    }
    return
  }


}
