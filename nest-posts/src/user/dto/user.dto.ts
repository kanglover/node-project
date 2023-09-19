import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class LoginUserDto {
  account: string;
  password: string;
}

export class UpdateUserDto extends PartialType(User) {}
