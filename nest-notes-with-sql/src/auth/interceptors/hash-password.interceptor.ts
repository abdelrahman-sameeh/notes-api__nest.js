import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import * as bcrypt from 'bcrypt'

export class HashPasswordInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const password = request.body.password
    const salt = await bcrypt.genSalt()
    request.body.password = await bcrypt.hash(password, salt)
    return next.handle().pipe()
  }
}


