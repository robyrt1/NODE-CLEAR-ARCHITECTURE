import { Request, Response, Application } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";
import { isEmpty } from "lodash";
import { HTTPCODE } from "../../@shared/constants/httpCode";

export const customerRoute = (app: Application) => {
  app.post("/customer", async (req: Request, res: Response) => {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    try {
      const customerDto = {
        name: req.body.name,
        address: {
          street: req.body.address.street,
          city: req.body.address.city,
          number: req.body.address.number,
          zip: req.body.address.zip,
        },
      };
      const output = await usecase.execute(customerDto);
      res.send(output);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get("/customer", async (req: Request, res: Response) => {
    const usecase = new ListCustomerUseCase(new CustomerRepository());
    const output = await usecase.execute({});

    if (isEmpty(output.customers))
      return res
        .status(HTTPCODE.BAD_REQUEST)
        .json("Não possui usuarios cadastrados");
        
    res.format({
      json: async () => res.send(output),
      xml: async () => res.send(CustomerPresenter.listXML(output)),
    });
  });
};
