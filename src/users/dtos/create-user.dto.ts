import { IsEmail, IsString } from 'class-validator';

export class CreateUserDtos {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
