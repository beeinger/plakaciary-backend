import { IsNotEmpty } from "class-validator";

export class AddFolderDto {
  @IsNotEmpty()
  patentId: string;

  @IsNotEmpty()
  name: string;
}
