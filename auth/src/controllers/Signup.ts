import { Request, Response } from 'express';
import { SignupSrv } from '../service/signup';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

class SignupController {
  async SignupHandler(req: Request, res: Response) {
    try {
      const signupData = await SignupSrv.signup(req.body);
      return res.status(StatusCodes.CREATED).send({
        message: ReasonPhrases.CREATED,
        data: signupData,
      });
    } catch (error) {
      throw error;
    }
  }
}
const SignupCntrol = new SignupController();
export { SignupCntrol };
