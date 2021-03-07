import { IsEmail, IsIn, IsNotEmpty } from "class-validator";

export class AddPermissionDto {
  @IsNotEmpty()
  folderId: string;

  @IsIn(["write", "read"])
  permission: "write" | "read";

  @IsEmail({}, { each: true })
  emails: string[];
}
