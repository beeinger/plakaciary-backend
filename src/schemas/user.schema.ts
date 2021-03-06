import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ default: null, unique: true })
  nickname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: false })
  authorized: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
