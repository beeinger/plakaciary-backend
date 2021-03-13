import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";

import { DefaultStatus } from "src/shared/helpers";
import { hasRoles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Role } from "../../../enums/role.enum";
import { UserDocument } from "src/schemas/user.schema";
import { AuthUser } from "../../auth/decorators/user.decorator";
import { AddFileDto } from "../dtos/add-file.dto";
import { UserFileService } from "../services/user-file.service";
import { DelFileDto } from "../dtos/del-file.dto";

@Controller("user/file")
export class UserFileController {
  constructor(private readonly userFileService: UserFileService) {}

  @Post("add")
  @hasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addFIle(
    @AuthUser() user: UserDocument,
    @Body() addFileDto: AddFileDto
  ): Promise<DefaultStatus> {
    return await this.userFileService.addFile(user, addFileDto);
  }

  @Delete("delete")
  @hasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delFile(@Body() delFileDto: DelFileDto): Promise<DefaultStatus> {
    return await this.userFileService.delFile(delFileDto);
  }
}
