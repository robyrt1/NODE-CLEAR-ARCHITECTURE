import Product from "../../../domain/product/entity/product";
import FindProductrUseCase from "./find.product.usecase";

const product = new Product('123','Teste',6.5);

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  describe("Unit Test find Product use case", () => {
    it("should find a product", async () => {
      const productRepository = MockRepository();
      const usecase = new FindProductrUseCase(productRepository);
  
      const input = {
        id: "123",
      };
  
      const output = {
        id: "123",
        name: "Teste",
        price: 6.5
      };
  
      const result = await usecase.execute(input);
  
      expect(result).toEqual(output);
    });
  
    it("should not find a product", async () => {
      const productRepository = MockRepository();
      productRepository.find.mockImplementation(() => {
        throw new Error("Product not found");
      });
      const usecase = new FindProductrUseCase(productRepository);
  
      const input = {
        id: "123",
      };
  
      expect(() => {
        return usecase.execute(input);
      }).rejects.toThrow("Product not found");
    });
  });
  