import { User, UserSchema } from "src/schemas/user.schema";

import { AuthModule } from "../auth/auth.module";
import { FileModule } from "../file/file.module";
import { FolderModule } from "../folder/folder.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
import { UserFileController } from "./controllers/user-file.controller";
import { UserFileService } from "./services/user-file.service";
import { UserService } from "./services/user.service";

@Module({
  imports: [
    AuthModule,
    FolderModule,
    FileModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, UserFileController],
  providers: [UserService, UserFileService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
