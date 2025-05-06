import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcryptjs"


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async register(registerDto: RegisterDto) {
    let user = await this.userModel.findOne({ email: registerDto.email })
    if (user) {
      throw new ConflictException("This email is already in use.")
    }
    user = await this.userModel.create(registerDto)
    return user.toObject()
  }


  async login(loginDto: LoginDto){
    const user = await this.userModel.findOne({email: loginDto.email})
    if(!user){
      throw new BadRequestException("Email or password is incorrect")
    }
    const matchPassword = await bcrypt.compare(loginDto.password, user.password)
    if(!matchPassword){
      throw new BadRequestException("Email or password is incorrect")
    }
    return user.toObject()
  }


}




