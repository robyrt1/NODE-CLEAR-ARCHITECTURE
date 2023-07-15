import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";

export default class FindCustomerUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: any): Promise<any> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price:product.price,
    };
  }
}
