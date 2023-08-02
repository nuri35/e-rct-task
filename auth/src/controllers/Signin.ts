import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { SigninSrv } from '../services/Signin';

class SigninController {
  async signinHandler(req: Request, res: Response) {
    try {
      return 'ok'; // en son duzenlenecek
    } catch (error) {
      throw error;
    }
  }
}
const signinCntrol = new SigninController();
export { signinCntrol as SigninCntrol };
