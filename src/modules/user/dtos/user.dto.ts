import { IsEmail, IsNumber } from "class-validator";

import { Folder } from "src/schemas/folder.schema";

export class UserDto {
  @IsEmail()
  email: string;

  @IsNumber()
  level: number;

  mainFolder: Folder;

  token: string;
}
