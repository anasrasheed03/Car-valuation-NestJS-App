import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDtos } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDtos) {
    this.userService.create(body.email, body.password);
  }
}
