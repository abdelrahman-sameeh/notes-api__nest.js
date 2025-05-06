import { IsEmail, IsOptional, IsString } from "class-validator";




export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string

}

