import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./create-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User[]> {
    return await this.userModel.find({ email: email }).exec();
  }

  async delete(email: string): Promise<{ error: boolean; message?: string }> {
    const response = await this.userModel.deleteOne({ email: email }).exec();
    if (response.deletedCount) return { error: false };
    if (response.n)
      return { error: true, message: "Could not delete this user" };
    return { error: true, message: "User not found" };
  }

  async authorize(
    email: string
  ): Promise<{ error: boolean; message?: string }> {
    const response = await this.userModel
      .find({ email })
      .update({ authorized: true })
      .exec();
    if (response.nModified) return { error: false };
    if (response.n) return { error: false, message: "User already authorized" };
    return { error: true, message: "User not found" };
  }

  async setNickname(
    email: string,
    nickname: string
  ): Promise<{ error: boolean; message?: string }> {
    const response = await this.userModel
      .find({ email })
      .update({ nickname })
      .exec();
    if (response.nModified) return { error: false };
    if (response.n) return { error: false, message: "Username changed" };
    return { error: true, message: "User not found" };
  }
}
