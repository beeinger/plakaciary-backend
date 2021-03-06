import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/\w([0-9]+[a-z]|[a-z]+[0-9]|[A-Z]+[0-9])[a-zA-Z0-9]*/g, {
    message: "Password is too weak",
  })
  password: string;
}
