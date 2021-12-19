import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepositoriy";

class ListProductService {
    public async execute(): Promise<Product[] | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);

        const products = productsRepository.find();
        return products;
    }
}

export default ListProductService;