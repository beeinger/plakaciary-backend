import { Document, Schema as MongoSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { User } from "./user.schema";

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: "User", required: true })
  owner: User;

  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  read: User[];

  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  write: User[];
}

export const FileSchema = SchemaFactory.createForClass(File);
