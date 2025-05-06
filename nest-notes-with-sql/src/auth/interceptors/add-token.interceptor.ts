import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { generateToken } from "../../common/helper/generate-token";
import { User } from "src/auth/entities/user.entity";

export class AddTokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((user: User) => {
      const token = generateToken({ email: user.email, id: user.id })
      return {
        data: {
          name: user.name,
          email: user.email,
        },
        token
      }
    }))
  }
}

