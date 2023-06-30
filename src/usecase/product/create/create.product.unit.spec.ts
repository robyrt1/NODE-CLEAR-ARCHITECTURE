import CreateProductUseCase from "./create.product.usecase";
import CreateCustomerUseCase from "./create.product.usecase";
const input = {
  name: 'Jonh',
  price: 15.6
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productsRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productsRepository);

    const output = await productCreateUseCase.execute(input);
    
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productsRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productsRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is missing", async () => {
    const productsRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productsRepository);
    input.name = "Jonh";
    input.price = null

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
