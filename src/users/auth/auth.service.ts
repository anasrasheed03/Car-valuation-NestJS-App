import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user.length) {
      throw new BadRequestException('Email is already in user');
    }
  }

  signIn() {}
}
