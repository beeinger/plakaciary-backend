import { ExampleModule } from "./modules/example/example.module";
import { Module } from "@nestjs/common";
import { PdfModule } from "./modules/pdf/pdf.module";

@Module({
  imports: [ExampleModule, PdfModule],
})
export class AppModule {}
