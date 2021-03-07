import { Folder, FolderSchema } from "src/schemas/folder.schema";

import { FolderService } from "./folder.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
  ],
  providers: [FolderService],
  exports: [MongooseModule, FolderService],
})
export class FolderModule {}
