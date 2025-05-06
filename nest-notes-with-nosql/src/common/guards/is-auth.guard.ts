import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken'
import { key } from "../helper/generate-token";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/user/schemas/user.schema";
import { Model } from "mongoose";


export class AuthGuard implements CanActivate{
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers['authorization']?.split(" ")[1]
    if(!token){
      throw new UnauthorizedException("token not found")
    }
    
    let decoded;
    
    try{
      decoded = jwt.verify(token, key)
    }catch(err){
      throw new UnauthorizedException('invalid token')
    }

    const user = await this.userModel.findOne({email: decoded.email})
    if(!user){
      throw new UnauthorizedException("user not found")
    }

    request.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }
    return true
  }
}
