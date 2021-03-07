import { File, FileSchema } from "src/schemas/file.schema";

import { FileService } from "./file.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  providers: [FileService],
  exports: [MongooseModule],
})
export class FileModule {}
