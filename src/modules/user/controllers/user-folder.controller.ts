import { Body, Controller, Post, UseGuards } from "@nestjs/common";

import { DefaultStatus } from "src/shared/helpers";
import { hasRoles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Role } from "../../../enums/role.enum";
import { UserDocument } from "src/schemas/user.schema";
import { AuthUser } from "../../auth/decorators/user.decorator";
import { AddFolderDto } from "../dtos/add-folder.dto";
import { UserFolderService } from "../services/user-folder.service";
import { AddPermissionDto } from "../dtos/add-permission.dto";

@Controller("user/folder")
export class UserFolderController {
  constructor(private readonly userFolderService: UserFolderService) {}

  @Post()
  @hasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async add(
    @AuthUser() user: UserDocument,
    @Body() addFolderDto: AddFolderDto
  ): Promise<DefaultStatus> {
    return this.userFolderService.add(user, addFolderDto);
  }

  @Post("permission")
  @hasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addPermission(
    @AuthUser() user: UserDocument,
    @Body() addPermissionDto: AddPermissionDto
  ): Promise<DefaultStatus> {
    return this.userFolderService.addPermission(user, addPermissionDto);
  }
}
