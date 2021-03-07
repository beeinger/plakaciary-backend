import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import {
  AuthorizeStatus,
  DefaultStatus,
  JwtPayload,
  LoginStatus,
  UserPopulation,
} from "src/shared/helpers";
import { CreateUserDto } from "../dtos/create-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { AuthService } from "../../auth/auth.service";
import * as crypto from "crypto";
import { FolderService } from "../../folder/folder.service";
import { Role } from "src/enums/role.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
    private readonly folderService: FolderService
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.authService.hashPassword(
      createUserDto.password
    );
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async login(
    loginUserDto: LoginUserDto
  ): Promise<LoginStatus | DefaultStatus> {
    let user = await this.userModel
      .findOne({ email: loginUserDto.email, level: { $gte: Role.User } })
      .exec();

    if (
      !user ||
      !(await this.authService.comparePasswords(
        loginUserDto.password,
        user.password
      ))
    )
      throw new HttpException(
        "Invalid login details or user not confirmed",
        HttpStatus.UNAUTHORIZED
      );

    const token = await this.authService.generateJwt(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async authorize(email: string): Promise<AuthorizeStatus | DefaultStatus> {
    const token = crypto.randomBytes(20).toString("hex");
    const response = await this.userModel
      .find({ email, level: -2 })
      .update({ level: -1, token })
      .exec();

    if (!response.nModified)
      return {
        error: true,
        message: "User already authorized or does not exist",
      };

    return { error: false, token };
  }

  async confirm(token: string): Promise<DefaultStatus> {
    const user = await this.userModel.findOne({ token, level: -1 }).exec();
    if (!user)
      return {
        error: true,
        message: "User email already confirmed or does not exist",
      };
    const newFolder = await this.folderService.create({
      name: "root",
      owner: user._id,
    });
    user.level = 0;
    user.mainFolder = newFolder._id;
    user.save();

    return { error: false };
  }

  async makeAdmin(email: string): Promise<DefaultStatus> {
    const response = await this.userModel
      .find({ email, level: { $lt: 1 } })
      .update({ level: 1 })
      .exec();

    if (!response.nModified)
      return {
        error: true,
        message: "User already is an admin or does not exist",
      };

    return { error: false };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().populate(UserPopulation).exec();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async delete(email: string): Promise<DefaultStatus> {
    const response = await this.userModel.deleteOne({ email: email }).exec();

    if (response.deletedCount) return { error: false };
    if (response.n)
      return { error: true, message: "Could not delete this user" };
    return { error: true, message: "User not found" };
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.findByEmail(payload.email);
    if (!user)
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
    return user;
  }
}
