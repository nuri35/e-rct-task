import { Request, Response } from 'express';
import { MailVerifySrv } from '../services/MailVerify';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

class MailVerifyController {
  async mailVerifyHandler(req: Request, res: Response) {
    try {
      const stationMailProcess = await MailVerifySrv.mailVerify(
        req.query.token as string
      );
      return res.status(StatusCodes.OK).send({
        message: ReasonPhrases.OK,
        data: stationMailProcess,
      });
    } catch (error) {
      throw error;
    }
  }
}
const mailVerifyCntrl = new MailVerifyController();
export { mailVerifyCntrl as MailVerifyCntrl };
