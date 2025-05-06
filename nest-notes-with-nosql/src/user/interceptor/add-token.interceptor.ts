import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { generateToken } from "src/common/helper/generate-token";
import { UserType } from "../schemas/user.schema";

export class AddTokenInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map(async(data: UserType)=>{
      const token = await generateToken({
        email: data.email,
        userId: data.id
      })
      return {
        data: {
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email,
        },
        token
      }
    }))
  }
}

