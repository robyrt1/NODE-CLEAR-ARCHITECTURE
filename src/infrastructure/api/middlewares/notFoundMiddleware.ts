import { Response, Request, NextFunction } from "express";
import { HTTPCODE } from "../../@shared/constants/httpCode";

export function notFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    res.status(HTTPCODE.NOT_FOUND).json({error:'Rota não encontrada!'})
}