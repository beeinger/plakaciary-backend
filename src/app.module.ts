import { ExampleModule } from "./example/exmple.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [ExampleModule],
})
export class AppModule {}
