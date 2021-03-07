import { Injectable } from "@nestjs/common";
import { jsPDF } from "jspdf";
import { parseCharToImagePath } from "utils";
import { readFileSync } from "fs";

@Injectable()
export class PdfService {
  getPdf(data: string): string {
    const slogans = data;
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const characters = slogans.split("");
    let i = 0;
    for (const char of characters) {
      console.log(char);
      if (char !== " ") {
        const _char = parseCharToImagePath(char);
        const image = readFileSync(`src/resources/alphabet/${_char}.png`);
        doc.addImage(image, "PNG", 0, 0, 210, 297);
      }
      if (i != slogans.length - 1) doc.addPage("a4", "p");
      console.log(((i * 100) / characters.length).toFixed(2) + "% ", slogans);
      i++;
    }
    console.log("100% ", slogans);
    const pdf = doc.output("datauristring", { filename: slogans + ".pdf" });

    return pdf;
  }
}
