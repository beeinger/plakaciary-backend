import { User, UserSchema } from "src/schemas/user.schema";

import { AuthModule } from "../auth/auth.module";
import { FolderModule } from "../folder/folder.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./controllers/user.controller";
import { UserFolderController } from "./controllers/user-folder.controller";
import { UserFolderService } from "./services/user-folder.service";
import { UserService } from "./services/user.service";

@Module({
  imports: [
    AuthModule,
    FolderModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, UserFolderController],
  providers: [UserService, UserFolderService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
