import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { AddTokenInterceptor } from "./interceptors/add-token.interceptor";
import { HashPasswordInterceptor } from "./interceptors/hash-password.interceptor";
import { LoginDto } from "./dto/login-dto";

@Controller()
export class AuthController{

  constructor(private readonly authService: AuthService){}

  @Post("register")
  @UseInterceptors(HashPasswordInterceptor, AddTokenInterceptor)
  register(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto)
  }
  
  @Post("login")
  @UseInterceptors(AddTokenInterceptor)
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto)
  }


}
