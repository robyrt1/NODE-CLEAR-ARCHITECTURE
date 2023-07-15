import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { IInputFindUseCase, IOutputFindUseCase } from "./find.product.dto";

export default class FindProductrUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: IInputFindUseCase): Promise<IOutputFindUseCase> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price:product.price,
    };
  }
}
