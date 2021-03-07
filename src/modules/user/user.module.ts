import { User, UserSchema } from "src/schemas/user.schema";

import { AuthModule } from "../auth/auth.module";
import { FolderModule } from "../folder/folder.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    AuthModule,
    FolderModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
