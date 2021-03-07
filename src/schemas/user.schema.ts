import { Document, Schema as MongoSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Folder } from "./folder.schema";
import { Role } from "src/enums/role.enum";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: -2 })
  level: Role;

  @Prop()
  token: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: "Folder" })
  mainFolder: Folder;
}

export const UserSchema = SchemaFactory.createForClass(User);
