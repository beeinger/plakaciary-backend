import { Role } from "./role.enum";
import { SetMetadata } from "@nestjs/common";

export const hasRoles = (...hasRoles: Role[]) => SetMetadata("roles", hasRoles);
