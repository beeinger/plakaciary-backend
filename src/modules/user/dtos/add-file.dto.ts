import { Folder } from "src/schemas/folder.schema";
import { IsNotEmpty } from "class-validator";

export class AddFileDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  folderId: Folder;
}
