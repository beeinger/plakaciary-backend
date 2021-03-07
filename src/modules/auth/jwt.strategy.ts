import { ExtractJwt, Strategy } from "passport-jwt";
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";

import { JwtPayload } from "src/shared/helpers";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/modules/user/services/user.service";
import { User } from "src/schemas/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userService.validate(jwtPayload);
    if (!user) {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
