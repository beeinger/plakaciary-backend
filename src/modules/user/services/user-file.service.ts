import { AddFileDto } from "../dtos/add-file.dto";
import { DefaultStatus } from "src/shared/helpers";
import { DelFileDto } from "../dtos/del-file.dto";
import { FileService } from "../../file/file.service";
import { FolderService } from "../../folder/folder.service";
import { Injectable } from "@nestjs/common";
import { UserDocument } from "src/schemas/user.schema";

@Injectable()
export class UserFileService {
  constructor(
    private readonly fileService: FileService,
    private readonly folderService: FolderService
  ) {}

  async addFile(
    user: UserDocument,
    addFileDto: AddFileDto
  ): Promise<DefaultStatus> {
    let newFile;
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
    let file;
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
}
