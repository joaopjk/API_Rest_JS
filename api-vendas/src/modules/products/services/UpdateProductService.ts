import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductRepositoriy";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);

        var product = await productRepository.findOne(id);
        if (!product) {
            throw new AppError(`Produto com o id:${id} não foi encontrado!`)
        }

        const productExists = await productRepository.findByName(name);
        if (productExists && name !== product.name) {
            throw new AppError(`Já existe um produto com o nome ${name} na base de dados!`);
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }
}

export default UpdateProductService;