import * as bcrypt from "bcrypt";

import { Injectable } from "@nestjs/common";
import { JwtPayload } from "src/shared/helpers";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../user/dtos/user.dto";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwt({
    email,
    level,
  }: UserDto): Promise<{ expiresIn: string | number; accessToken: string }> {
    const user: JwtPayload = { email, level };
    const accessToken = await this.jwtService.signAsync(user);
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
