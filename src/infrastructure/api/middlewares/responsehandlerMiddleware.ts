import { ICustomReponse } from './../../@shared/interfaces/customResponseInterfaces';
import { HTTPCODE } from './../../@shared/constants/httpCode';
import { NextFunction, Request, Response } from 'express';

export function responsehandlerMiddleware(req:Request, res:Response, next:NextFunction):void {
    const originalJson: any = res.json;

    res.json = function (data: any):Response<any, Record<string,any>> {
        const customResponseData = {
            httpCode: res.statusCode,
            routePath: req.originalUrl,
            timesTamp : new Date().toDateString(),
            data: data,
        } as ICustomReponse

        return originalJson.bind(this)(customResponseData) 

    };

    next();
}
