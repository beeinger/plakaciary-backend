import { AuthModule } from "./modules/user/user.module";
import { ExampleModule } from "./modules/example/example.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/plakaciary", {
      useCreateIndex: true,
      useNewUrlParser: true,
    }),
    ExampleModule,
    AuthModule,
  ],
})
export class AppModule {}
