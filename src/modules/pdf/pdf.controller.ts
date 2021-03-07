import { Controller, Get, Query } from "@nestjs/common";

import { PdfService } from "./pdf.service";

@Controller("pdf")
export class PdfController {
  constructor(private readonly appService: PdfService) {}

  @Get()
  getPdf(@Query("data") data): string {
    return this.appService.getPdf(data);
  }
}
