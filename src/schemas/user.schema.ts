import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from "mongoose";
import { Role } from "src/modules/auth/guards/role.enum";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: -2 })
  level: Role;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
