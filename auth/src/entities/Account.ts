import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './Base';
import { User } from './User';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public accountName!: string;

  @Column()
  @Length(4, 20)
  @IsEmail()
  public accountEmail!: string;

  @Column()
  @Length(4, 20)
  @IsNotEmpty()
  public accountTitle!: string;

  @Column()
  @IsNotEmpty()
  public accountIdtaxNumber!: string;

  @Column()
  @IsNotEmpty()
  public accountPhone!: string;

  @Column()
  @IsNotEmpty()
  public accountAddress!: string;

  @Column()
  @IsNotEmpty()
  public accountCountry!: string;

  @OneToMany(() => User, (user) => user.account)
  public user!: User[];
}

export default Account;
