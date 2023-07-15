import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { customerRoute } from "../routes/customer.route";
// import routes from "../routes/index.js";


class ExpressConfig {
  private app: Application;

  private static _instance: ExpressConfig;

  private constructor() {
    this.app = express();
    this.init();
  }

  public static getInstance(): ExpressConfig {
    if (!ExpressConfig._instance) ExpressConfig._instance = new ExpressConfig();
    return ExpressConfig._instance;
  }

  private setMiddlewares(middlewares: any[]): void {
    middlewares.forEach((middleware) => this.app.use(middleware));
  }

  private setRoutes(routes: Function[]): void {
    routes.forEach((route) => {
      route(this.app);
    });
  }

  private setErrorLogHandlers(): void {
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        res.status(error.statusCode || 500).json(error);
      }
    );
  }

  private init(): void {
    const middleware = [
      cors(),
      bodyParser.urlencoded({ extended: false }),
      bodyParser.json(),
    ];

    this.setMiddlewares(middleware);
    this.setRoutes([customerRoute]);
    this.setErrorLogHandlers();
  }

  public getApp(): Application {
    return this.app;
  }
}

export { ExpressConfig };
