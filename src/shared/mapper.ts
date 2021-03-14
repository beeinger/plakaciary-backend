import { User } from "src/schemas/user.schema";
import { UserDto } from "src/modules/user/dtos/user.dto";

export const toUserDto = (data: User): UserDto => {
  const { email, level, mainFolder, token } = data;
  const userDto: UserDto = { email, level, mainFolder, token };
  return userDto;
};
