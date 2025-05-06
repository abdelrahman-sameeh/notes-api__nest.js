import { SetMetadata } from "@nestjs/common";
import { ROLES } from "../types/type";

export const Roles = (...roles: string[]) => SetMetadata(ROLES, roles)


