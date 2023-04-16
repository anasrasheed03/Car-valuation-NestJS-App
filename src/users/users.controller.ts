import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDtos } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDtos } from './dtos/update-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDtos } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';

@Controller('auth')
@UseInterceptors(new SerializeInterceptor(UserDtos))
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDtos) {
    // this.userService.create(body.email, body.password);
    return this.authService.signUp(body.email, body.password);
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(+id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  @Get()
  getUsersByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDtos) {
    return this.userService.update(+id, body);
  }
}
