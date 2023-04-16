import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  loggerOnInsert() {
    console.log('Insert new record', this.id);
  }

  @AfterUpdate()
  loggerOnUpdate() {
    console.log('Update the records', this.id);
  }

  @AfterRemove()
  loggerOnRemove() {
    console.log('Remove the records', this.id);
  }
}
