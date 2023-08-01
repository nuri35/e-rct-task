import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { BaseEntity } from './Base';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public name!: string;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public lastName!: string;

  @Column({ select: false })
  @Length(4, 100)
  @IsNotEmpty()
  public password!: string;

  static removePassword(userObj: User) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password')
    );
  }

  @Column()
  @Length(4, 20)
  @IsEmail()
  public email!: string;

  @Column({
    default: false,
  })
  public isActive!: boolean;
}

export default User;
