import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ExampleModule } from "./modules/example/example.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
  ],
})
export class AppModule {}
