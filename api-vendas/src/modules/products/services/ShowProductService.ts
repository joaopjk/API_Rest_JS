import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepositoriy";

interface IRequest {
    id: string;
}

class ShowProductService {
    public async execute({ id }: IRequest): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);
        if (!product)
            throw new AppError(`O produto com o id:${id} não foi encontrado!`, 404);
        return product;
    }
}

export default ShowProductService;