import { User } from "src/schemas/user.schema";
import { UserDto } from "src/modules/user/dtos/user.dto";

export const toUserDto = (data: User): UserDto => {
  const { email, level } = data;
  let userDto: UserDto = { email, level };
  return userDto;
};
