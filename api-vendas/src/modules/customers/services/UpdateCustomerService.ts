import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs"
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({
        id,
        name,
        email
    }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomerRepository);

        const customer = await customerRepository.findById(id);
        if (!customer)
            throw new AppError("Usuário não encontrado!", 404);

        const customerEmailExists = await customerRepository.findByEmail(email);
        if (customerEmailExists && customerEmailExists.email !== email)
            throw new AppError("O email já está sendo utilizado por outro cliente!", 400);

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;