import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";

import { MongoError } from "mongodb";
import { Response } from "express";

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.statusCode = HttpStatus.FORBIDDEN;
        response.json({
          statusCode: HttpStatus.FORBIDDEN,
          message: this.message,
          error: "Forbidden",
        });
    }
  }
}
