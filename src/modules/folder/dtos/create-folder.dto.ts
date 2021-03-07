import { IsNotEmpty } from "class-validator";
import { User } from "src/schemas/user.schema";

export class CreateFolderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  owner: User;
}
