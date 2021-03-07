import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { File, FileDocument } from "src/schemas/file.schema";
import { CreateFileDto } from "./dtos/create-file.dto";

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(createFileDto: CreateFileDto): Promise<FileDocument> {
    const newFile = new this.fileModel(createFileDto);
    return await newFile.save();
  }
}
