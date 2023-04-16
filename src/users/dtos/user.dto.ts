import { Expose } from 'class-transformer';

export class UserDtos {
  @Expose()
  id: number;
  @Expose()
  email: number;
}
