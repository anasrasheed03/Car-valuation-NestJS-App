import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    //validate if user exists in the database.
    const user = await this.userService.findByEmail(email);
    if (user.length) {
      throw new BadRequestException('Email is already in user');
    }

    //generate salt for passwords in hexadecimal
    const salt = randomBytes(8).toString('hex');

    //generate hashed password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //generate hashed and salt based password
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    //create new user and save it
    return this.userService.create(email, hashedPassword);
  }

  signIn() {}
}
