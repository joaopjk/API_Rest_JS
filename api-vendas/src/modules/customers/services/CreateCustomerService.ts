import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomerRepository);

        const customerEmailExists = await customersRepository.findByEmail(email);
        if (customerEmailExists) {
            throw new AppError(`O cliente do ${email} já cadastrado em nosso site!`);
        }

        const customer = customersRepository.create({
            name, email
        });

        await customersRepository.save(customer);
        return customer;
    }
}

export default CreateCustomerService;