import {
  BadRequestError,
} from '@fbticketss/common';
import { DataSource } from 'typeorm';
import { databaseSource } from '../database/dataSource';
import { Account } from '../entities/Account';
import { User } from '../entities/User';
import { AccountCrInput, AccountUpInput } from './SrvInterfaces';

class AccountService {
  private cn!: DataSource;
  constructor() {
    this.cn = databaseSource._connection;
  }
  async create(account: AccountCrInput, userId: number) {
    // ok
    try {
      const userRepo = this.cn.getRepository(User);
      const user = (await userRepo.findOne({
        where: { id: userId },
      })) as User;
      if (user.account) {
        throw new BadRequestError('User already has an account');
      }

      const accountRepo = this.cn.getRepository(Account);

      const existingAccount = await accountRepo.findOne({
        where: [
          { accountEmail: account.accountEmail },
          { accountPhone: account.accountPhone },
        ],
      });

      if (existingAccount) {
        throw new BadRequestError('Account already exists');
      }

      const newAccount = accountRepo.create(account);
      const savedAccount = await accountRepo.save(newAccount);
      user.account = savedAccount;
      await userRepo.save(user);

      return savedAccount;
    } catch (error: any) {
      throw error;
    }
  }
  // ok
  async update(account: AccountUpInput, userId: number) {
    try {
      const accountRepo = this.cn.getRepository(Account);
      const userRepo = this.cn.getRepository(User);

      const user = (await userRepo.findOne({
        where: { id: userId },
      })) as User;

      if (!user.account) {
        throw new BadRequestError('User does not have an account');
      }

      const accountId = user.account.id;
      const existingAccount = await accountRepo.findOne({
        where: { id: accountId },
      });
      // security check again for is account exists
      if (!existingAccount) {
        throw new BadRequestError('Account does not exist');
      }

      const updatedAccount = accountRepo.merge(existingAccount, account);
      const savedAccount = await accountRepo.save(updatedAccount);

      return savedAccount;
    } catch (error: any) {
      throw error;
    }
  }
  // ok
  async delete(userId: number) {
    let userAccountId: number;
    try {
      const accountRepo = this.cn.getRepository(Account);
      const userRepo = this.cn.getRepository(User);

      const user = (await userRepo.findOne({
        where: { id: userId },
      })) as User;

      if (!user.account) {
        throw new BadRequestError('User does not have an account');
      }

      userAccountId = user.account.id;

      user.account = null;
      await userRepo.save(user);
      const deletedAccount = await accountRepo.delete(userAccountId);

      return deletedAccount;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }
  // ok
  async get(userId: number) {
    try {
      const userRepo = this.cn.getRepository(User);

      const user = (await userRepo.findOne({
        where: { id: userId },
      })) as User;
      return user.account;
    } catch (error: any) {
      throw error;
    }
  }
}

const accountSrv = new AccountService();
export { accountSrv as AccountSrv };
