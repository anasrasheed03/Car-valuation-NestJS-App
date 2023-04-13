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

  findById(id: number): Promise<Users> {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string): Promise<any> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<Users>) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('user not found');
    }
    return this.repo.remove(user);
  }
}
