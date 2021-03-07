import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Folder, FolderDocument } from "src/schemas/folder.schema";
import { CreateFolderDto } from "./dtos/create-folder.dto";

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private folderModel: Model<FolderDocument>
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<FolderDocument> {
    const newFolder = new this.folderModel(createFolderDto);
    return await newFolder.save();
  }
}
