import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepositoriy";

interface IRequest {
    name: string;
    price: number;
    quantity: number
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        const productExists = await productRepository.findByName(name);
        if (productExists) {
            throw new AppError(`Já existe um produto com o nome ${name} na base de dados!`);
        }

        const product = productRepository.create({
            name, price, quantity
        })

        await productRepository.save(product);

        return product;
    }
}

export default CreateProductService;