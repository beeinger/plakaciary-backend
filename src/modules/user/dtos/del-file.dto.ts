import { File } from "src/schemas/file.schema";
import { Folder } from "src/schemas/folder.schema";
import { IsNotEmpty } from "class-validator";

export class DelFileDto {
  @IsNotEmpty()
  fileId: File;

  @IsNotEmpty()
  folderId: Folder;
}
