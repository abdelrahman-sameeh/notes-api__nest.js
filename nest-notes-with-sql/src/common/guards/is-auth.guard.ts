import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'
import { key } from "../helper/generate-token";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { Repository } from "typeorm";

export type DecodeType = { email: string, id: string, iat: number, exp: number }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(" ")[1]
    try {
      const decoded = jwt.verify(token, key) as DecodeType
      const user = await this.userRepository.findOne({ where: { id: decoded.id } });
      request.user = {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
      }
      return true
    } catch (err) {
      throw new UnauthorizedException("invalid token")
    }
  }
}



