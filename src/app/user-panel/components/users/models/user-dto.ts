import {UserAuthorityDto} from "./user-authority-dto";

export class UserDto {
  id: string;
  username: string;
  password: string;
  enabled: boolean;
  fullName: string;
  email: string;
  userAuthorities: UserAuthorityDto[];
}
