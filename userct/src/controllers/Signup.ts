import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { SignupSrv } from '../services/Signup';
import { SignupInput } from '../services/SrvInterfaces';

class SignupController {
  async signupHandler(req: Request, res: Response) {
    try {
      const signupData = await SignupSrv.signup(req.body as SignupInput);
      return res.status(StatusCodes.CREATED).send({
        message: ReasonPhrases.CREATED,
        data: signupData,
      });
    } catch (error: any) {
      throw error;
    }
  }
}
const signupCntrol = new SignupController();
export { signupCntrol as SignupCntrol };
