import { AddFileDto } from "../dtos/add-file.dto";
import { DefaultStatus } from "src/shared/helpers";
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

    if (!parentFolder)
      return { error: true, message: "Folder does not exist." };

    parentFolder.files.push(newFile._id);
    parentFolder.save();

    return { error: false };
  }
}
