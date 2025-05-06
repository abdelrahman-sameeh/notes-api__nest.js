import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "./user.service";
import { EncryptPasswordInterceptor } from "src/common/interceptor/encrypt-password.interceptor";
import { AddTokenInterceptor } from "./interceptor/add-token.interceptor";
import { LoginDto } from "./dto/login.dto";



@Controller()
export class UserController{
  constructor(private readonly userService: UserService){}

  @Post("register")
  @UseInterceptors(EncryptPasswordInterceptor, AddTokenInterceptor)
  async register(@Body() registerDto: RegisterDto){
    return this.userService.register(registerDto)
  }
  
  @Post("login")
  @UseInterceptors(AddTokenInterceptor)
  async login(@Body() loginDto: LoginDto){
    return this.userService.login(loginDto)
  }

}
