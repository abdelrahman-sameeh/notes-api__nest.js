import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import * as bcrypt from "bcryptjs";


export class EncryptPasswordInterceptor implements NestInterceptor{
  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    return next.handle().pipe()
  }
}

