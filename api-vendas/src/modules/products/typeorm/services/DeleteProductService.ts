import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/ProductRepositoriy";

interface IRequest {
    id: string
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository);

        var product = await productRepository.findOne(id)
        if (!product) {
            throw new AppError(`O produto com o id:${id} não foi encontrado!`, 404);
        }

        await productRepository.remove(product);
    }
}

export default DeleteProductService;