import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [ExampleController],
  providers: [ExampleService],
})
export class ExampleModule {}
