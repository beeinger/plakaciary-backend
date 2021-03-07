import { IsNotEmpty } from "class-validator";
import { User } from "src/schemas/user.schema";

export class AddFolderDto {
  @IsNotEmpty()
  folderId: string;

  @IsNotEmpty()
  userId: User;

  @IsNotEmpty()
  name: string;
}
