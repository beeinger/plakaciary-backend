import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { JwtPayload } from "src/shared/helpers";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt({
    email,
    level,
  }: JwtPayload): Promise<{ expiresIn: string | number; accessToken: string }> {
    const accessToken = await this.jwtService.signAsync({ email, level });
    return {
      expiresIn: process.env.EXPIRES_IN,
      accessToken,
    };
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
