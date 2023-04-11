import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly postRepository: Repository<Users>,
  ) {}

  async create(users: Users): Promise<Users> {
    return this.postRepository.save(users);
  }
}
