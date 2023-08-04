import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { BaseEntity } from './Base';
import { User } from './User';

@Entity()
@Unique(['accountEmail'])
@Unique(['accountPhone'])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public accountName!: string;

  @Column()
  @IsEmail()
  public accountEmail!: string;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public accountTitle!: string;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public accountIdtaxNumber!: string;

  @Column()
  @IsNotEmpty()
  public accountPhone!: string;

  @Column()
  @Length(4, 50)
  @IsNotEmpty()
  public accountAddress!: string;

  @Column()
  @Length(4, 10)
  @IsNotEmpty()
  public accountCountry!: string;

  @OneToMany(() => User, (user) => user.account)
  public user!: User[];
}

export default Account;
