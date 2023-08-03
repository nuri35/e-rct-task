import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './Base';
import Account from './Account';

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

  @Column()
  @Length(4, 100)
  @IsNotEmpty()
  public password!: string;

  @Column()
  @Length(4, 20)
  @IsEmail()
  public email!: string;

  @Column({
    default: false,
  })
  public isActive!: boolean;

  @ManyToOne(() => Account, (account) => account.user, { eager: true })
  account!: Account;
}

export default User;
