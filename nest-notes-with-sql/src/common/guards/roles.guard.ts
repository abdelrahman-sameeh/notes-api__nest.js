import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken'
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { DecodeType } from "./is-auth.guard";
import { key } from "../helper/generate-token";
import { ROLES } from "../types/type";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, @InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(" ")[1]

    if (!token) {
      throw new UnauthorizedException("token not found")
    }
    let decoded;

    try {
      decoded = jwt.verify(token, key) as DecodeType
    } catch (err) {
      throw new UnauthorizedException("invalid token")
    }

    const user = await this.userRepository.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw new UnauthorizedException("user not found")
    }
    request.user = {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    }

    const requiredRoles = this.reflector.getAllAndOverride(ROLES, [context.getHandler(), context.getClass()])

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (!requiredRoles.includes(request.user.role)) {
      throw new ForbiddenException("You do not have permission (role denied)");
    }
    return true

  }
}

