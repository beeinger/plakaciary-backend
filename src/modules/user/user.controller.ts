import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseFilters,
} from "@nestjs/common";

import { UserService } from "./user.service";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./create-user.dto";
import { MongoExceptionFilter } from "../../filters/mongo.exception";

@Controller("user")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Post()
  @UseFilters(
    new MongoExceptionFilter("User with the given email already exists")
  )
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.appService.create(createUserDto);
  }

  //! Admins only
  @Get("all")
  async findAll(): Promise<User[]> {
    return this.appService.findAll();
  }

  //! Admins or the account owner only
  @Delete(":email")
  async delete(
    @Param("email") email: string
  ): Promise<{ error: boolean; message?: string }> {
    return this.appService.delete(email);
  }

  @Get(":email")
  async findByEmail(@Param("email") email: string): Promise<User[]> {
    return this.appService.findByEmail(email);
  }

  //! Admins only
  @Get("authorize/:email")
  async authorize(
    @Param("email") email: string
  ): Promise<{ error: boolean; message?: string }> {
    return this.appService.authorize(email);
  }

  //! Account owner only
  @Post("nick/:email")
  async setNickname(
    @Param("email") email: string,
    @Query("nick") nickname: string
  ): Promise<{ error: boolean; message?: string }> {
    return this.appService.setNickname(email, nickname);
  }
}
