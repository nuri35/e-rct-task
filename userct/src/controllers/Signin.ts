import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { SigninSrv } from '../services/Signin';
import { SigninInput } from '../services/SrvInterfaces';

class SigninController {
  async signinHandler(req: Request, res: Response) {
    try {
      const valueObj = await SigninSrv.signin(req.body as SigninInput);

      req.session = {
        jwt: valueObj.token,
      };
      return res.status(StatusCodes.OK).send({
        message: ReasonPhrases.OK,
        data: valueObj.user,
      });
    } catch (error) {
      throw error;
    }
  }
}
const signinCntrol = new SigninController();
export { signinCntrol as SigninCntrol };
