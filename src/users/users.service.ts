import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly repo: Repository<Users>,
  ) {}

  async create(email, password): Promise<Users> {
    const user = this.repo.create({ email, password });

    //to call the hooks inside of entity we need to pass user instance instead of passing simple object
    return this.repo.save(user);
  }
}
