import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async signIn(email: string, password: string) {
    //search for the user
    const [user] = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    //fetch user stored hash
    const [salt, storedHash] = user.password.split('.');

    //generate current request hash
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('password is not correct');
    }

    return user;
  }
}
