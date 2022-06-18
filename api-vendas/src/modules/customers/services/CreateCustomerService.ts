import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

class CreateCustomerService {
    public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
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