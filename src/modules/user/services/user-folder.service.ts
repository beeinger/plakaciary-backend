import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { AddFolderDto } from "src/modules/user/dtos/add-folder.dto";
import { AddPermissionDto } from "../dtos/add-permission.dto";
import { DefaultStatus } from "src/shared/helpers";
import { FolderService } from "../../folder/folder.service";
import { Role } from "src/enums/role.enum";
import { UserDocument } from "src/schemas/user.schema";
import { UserService } from "./user.service";

@Injectable()
export class UserFolderService {
  constructor(
    private readonly folderService: FolderService,
    private readonly userService: UserService
  ) {}

  async add(
    user: UserDocument,
    addFolderDto: AddFolderDto
  ): Promise<DefaultStatus> {
    const parentFolder = await this.folderService.findById(
      addFolderDto.parentId
    );
    if (!parentFolder)
      return { error: true, message: "Parent folder does not exist" };

    if (
      !(
        user.level >= Role.Admin ||
        String(parentFolder.owner) === String(user._id) ||
        parentFolder.write.includes(user._id)
      )
    )
      throw new HttpException(
        "Insufficient permissions",
        HttpStatus.UNAUTHORIZED
      );

    const newFolder = await this.folderService.create({
      name: addFolderDto.name,
      owner: user._id,
    });
    parentFolder.folders.push(newFolder._id);
    parentFolder.save();

    return { error: false };
  }

  async addPermission(
    user: UserDocument,
    addPermissionDto: AddPermissionDto
  ): Promise<DefaultStatus> {
    const folder = await this.folderService.findById(addPermissionDto.folderId);

    if (
      !(user.level >= Role.Admin || String(folder.owner) === String(user._id))
    )
      throw new HttpException(
        "Insufficient permissions",
        HttpStatus.UNAUTHORIZED
      );

    for (const email of addPermissionDto.emails) {
      const targetUser = await this.userService.findByEmail(email);
      if (
        !targetUser ||
        folder[addPermissionDto.permission].includes(targetUser._id)
      )
        return {
          error: true,
          message: `User ${email} does not exist or already has permissions`,
        };

      folder[addPermissionDto.permission].push(targetUser);
    }

    folder.save();
    return { error: false };
  }
}
