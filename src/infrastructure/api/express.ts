import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../customer/repository/sequelize/customer.model";
import { ExpressConfig } from "./conf/expressConf";
import dotenv from "dotenv";
dotenv.config();

export const expressConfig = ExpressConfig.getInstance().getApp();

export let sequelize: Sequelize;

const databaseConfig: any = JSON.parse(process.env.CONFIG_POSTGRES);

async function setupDb() {
  sequelize = new Sequelize(databaseConfig.DATABASE, databaseConfig.USERNAME, databaseConfig.PASSWORD,{
    host: 'snuffleupagus.db.elephantsql.com',
    dialect: "postgres",
  });
  await sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}
setupDb();


