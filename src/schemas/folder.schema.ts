import { Document, Schema as MongoSchema } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { File } from "./file.schema";
import { User } from "./user.schema";

export type FolderDocument = Folder & Document;

@Schema({ timestamps: true })
export class Folder {
  @Prop({ required: true })
  name: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: "User", required: true })
  owner: User;

  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  write: User[];

  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: "User" }],
    default: [],
  })
  read: User[];

  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: "Folder" }],
    default: [],
  })
  folders: Folder[];

  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: "File" }],
    default: [],
  })
  files: File[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
