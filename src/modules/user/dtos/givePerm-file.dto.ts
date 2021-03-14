import { File } from "src/schemas/file.schema";
import { IsNotEmpty } from "class-validator";

export class GivePermFileDto {
  @IsNotEmpty()
  fileId: File;

  @IsNotEmpty()
  permission: string;

  @IsNotEmpty()
  emails: string[];
}
