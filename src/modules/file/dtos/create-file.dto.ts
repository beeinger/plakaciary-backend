import { Folder } from "src/schemas/folder.schema";
import { IsNotEmpty } from "class-validator";
import { User } from "src/schemas/user.schema";

export class CreateFileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  owner: User;

  @IsNotEmpty()
  folderId: Folder;
}
