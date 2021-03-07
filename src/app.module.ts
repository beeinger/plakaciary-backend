import { ConfigModule } from "@nestjs/config";
import { ExampleModule } from "./modules/example/example.module";
import { FileModule } from "./modules/file/file.module";
import { FolderModule } from "./modules/folder/folder.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PdfModule } from "./modules/pdf/pdf.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot("mongodb://localhost/plakaciary", {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    ExampleModule,
    UserModule,
    FolderModule,
    FileModule,
    PdfModule,
  ],
})
export class AppModule {}
