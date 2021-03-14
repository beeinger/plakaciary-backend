import { AddFileDto } from "../dtos/add-file.dto";
import { DefaultStatus } from "src/shared/helpers";
import { DelFileDto } from "../dtos/del-file.dto";
import { FileDocument } from "src/schemas/file.schema";
import { FileService } from "../../file/file.service";
import { FolderService } from "../../folder/folder.service";
import { GivePermFileDto } from "../dtos/givePerm-file.dto";
import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/schemas/user.schema";
import { UserService } from "./user.service";

@Injectable()
export class UserFileService {
  constructor(
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly folderService: FolderService
  ) {}

  async addFile(
    user: UserDocument,
    addFileDto: AddFileDto
  ): Promise<DefaultStatus> {
    let newFile: FileDocument;
    try {
      newFile = await this.fileService.create({
        name: addFileDto.name,
        owner: user._id,
        folderId: addFileDto.folderId,
      });
    } catch (error) {
      return { error: true, message: "Invalid folderId." };
    }
    const parentFolder = await this.folderService.findById(
      String(addFileDto.folderId)
    );

    if (!parentFolder) return { error: true, message: "Folder not found." };

    parentFolder.files.push(newFile._id);
    parentFolder.save();

    return { error: false };
  }

  async delFile(delFileDto: DelFileDto): Promise<DefaultStatus> {
    let file: FileDocument;
    try {
      file = await this.fileService.deleteById(String(delFileDto.fileId));
    } catch (error) {
      return { error: true, message: "Invalid fileId." };
    }

    if (!file) return { error: true, message: "File not found" };

    const parentFolder = await this.folderService.findById(
      String(delFileDto.folderId)
    );

    if (!parentFolder) return { error: true, message: "Folder not found." };

    const fileIndex = parentFolder.files.indexOf(file._id);

    parentFolder.files.splice(fileIndex, 1);
    parentFolder.save();

    return { error: false };
  }

  async givePermFile(givePermFileDto: GivePermFileDto): Promise<DefaultStatus> {
    let file: FileDocument;
    const permission = givePermFileDto.permission;
    try {
      file = await this.fileService.findById(String(givePermFileDto.fileId));
    } catch (error) {
      return { error: true, message: "Invalid fileId." };
    }
    if (!file) return { error: true, message: "File not found" };
    switch (permission) {
      case "write":
        for (const email of givePermFileDto.emails) {
          const user = await this.userService.findByEmail(email);
          if (user === null)
            return { error: true, message: email + " not found" };
          file.write.push(user);
        }
        break;
      case "read":
        for (const email of givePermFileDto.emails) {
          const user = await this.userService.findByEmail(email);
          if (user === null)
            return { error: true, message: email + " not found" };
          file.read.push(user);
        }
        break;
      default:
        return { error: true, message: "Invalid permission" };
    }
    file.save();
    return { error: false };
  }
}
