import { IsNotEmpty } from "class-validator";

export class AddFolderDto {
  @IsNotEmpty()
  parentId: string;

  @IsNotEmpty()
  name: string;
}
