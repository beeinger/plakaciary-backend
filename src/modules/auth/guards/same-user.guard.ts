import {
  Injectable,
  CanActivate,
  Inject,
  forwardRef,
  ExecutionContext,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { UserService } from "src/modules/user/services/user.service";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UserIsUserGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const user: User = request.user;

    // TODO logic here
    return true;
  }
}
