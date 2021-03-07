import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from "@nestjs/common";

import { UserService } from "../services/user.service";
import { UserDto } from "../dtos/user.dto";
import { toUserDto } from "src/shared/mapper";
import { DefaultStatus, LoginStatus } from "src/shared/helpers";
import { MongoExceptionFilter } from "src/filters/mongo.exception";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { hasRoles } from "../../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../../auth/guards/jwt.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { Role } from "../../../enums/role.enum";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  @UseFilters(
    new MongoExceptionFilter("User with the given email already exists")
  )
  public async register(
    @Body() registerUserDto: RegisterUserDto
  ): Promise<UserDto> {
    return toUserDto(await this.userService.register(registerUserDto));
  }

  @Post("login")
  public async login(
    @Body() loginUserDto: LoginUserDto
  ): Promise<LoginStatus | DefaultStatus> {
    return await this.userService.login(loginUserDto);
  }

  @Get("authorize/:email")
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async authorize(@Param("email") email: string): Promise<DefaultStatus> {
    return this.userService.authorize(email);
  }

  @Get("confirm/:token")
  async confirm(@Param("token") token: string): Promise<DefaultStatus> {
    return this.userService.confirm(token);
  }

  @Get("admin/:email")
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  public async makeAdmin(
    @Param("email") email: string
  ): Promise<DefaultStatus> {
    return await this.userService.makeAdmin(email);
  }

  @Get("all")
  @hasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => toUserDto(user));
  }

  @Get(":email")
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findByEmail(@Param("email") email: string): Promise<UserDto[]> {
    const users = await this.userService.findByEmail(email);
    return users.map((user) => toUserDto(user));
  }

  @Delete(":email")
  @hasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async delete(@Param("email") email: string): Promise<DefaultStatus> {
    return this.userService.delete(email);
  }

  // TODO
  // @Get("self")
  // @hasRoles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async getSelf(@Param("email") email: string): Promise<UserDto[]> {
  //   const users = await this.userService.findByEmail(email);
  //   return users.map((user) => toUserDto(user));
  // }

  // @Delete("self")
  // @hasRoles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // async delete(@Param("email") email: string): Promise<DefaultStatus> {
  //   return this.userService.delete(email);
  // }
}
