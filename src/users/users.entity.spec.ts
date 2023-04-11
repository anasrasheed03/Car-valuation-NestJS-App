import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';

describe('UserService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create a user', async () => {
    const user = new Users();
    user.password = 'John';
    user.email = 'john@example.com';

    jest.spyOn(repository, 'save').mockResolvedValueOnce(user);

    const result = await service.create(user);

    expect(result).toEqual(user);
    expect(repository.save).toHaveBeenCalledWith(user);
  });
});
