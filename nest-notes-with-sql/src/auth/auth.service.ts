import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto } from "./dto/login-dto";
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}

  async register(registerDto: RegisterDto){
    return await this.userRepository.save(registerDto)
  }

  async login(loginDto: LoginDto){
    const user = await this.userRepository.findOne({where: {email: loginDto.email}})
    if(!user){
      throw new HttpException("email or password is invalid", HttpStatus.BAD_REQUEST)
    }
    const checkedPassword = await bcrypt.compare(loginDto.password, user.password)
    if(!checkedPassword){
      throw new HttpException("email or password is invalid", HttpStatus.BAD_REQUEST)
    }
    return user
  }


}
