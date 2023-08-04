import { Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AccountSrv } from '../services/Account';

class AccountController {
  async accountCreateHandler(req: Request, res: Response) {
    try {
      const userId = req.currentUser!.id as number;
      //? bızım req.currentUser!.id kendı yazdıgım kütüphanede strıng veya number olma durumu olabilir
      //? bazı projelerde uuid kullanırım bazi uygulamalarda autoincrement id kullanırım. dolayısıyla bu proje dahılınde id'nin gercekten number oldugu typescript'E iletebilmem ıcın tür degısımı as kullandım.
      const valAccount = await AccountSrv.create(req.body, userId);
      res.status(StatusCodes.CREATED).send({
        message: ReasonPhrases.CREATED,
        data: valAccount,
      });
    } catch (error) {
      throw error;
    }
  }

  async accountUpdateHandler(req: Request, res: Response) {
    try {
      const userId = req.currentUser!.id as number;
      const upAccount = await AccountSrv.update(req.body, userId);
      res.status(StatusCodes.OK).send({
        message: ReasonPhrases.OK,
        data: upAccount,
      });
    } catch (error) {
      throw error;
    }
  }

  async accountDeleteHandler(req: Request, res: Response) {
    try {
      const userId = req.currentUser!.id as number;
      const delAccount = await AccountSrv.delete(userId);
      res.status(StatusCodes.OK).send({
        message: ReasonPhrases.OK,
        data: delAccount,
      });
    } catch (error) {
      throw error;
    }
  }

  async accountGetHandler(req: Request, res: Response) {
    try {
      const userId = req.currentUser!.id as number;
      const getAccount = await AccountSrv.get(userId);
      res.status(StatusCodes.OK).send({
        message: ReasonPhrases.OK,
        data: getAccount,
      });
    } catch (error) {
      throw error;
    }
  }
}
const accountCtrl = new AccountController();
export { accountCtrl as AccountCtrl };
