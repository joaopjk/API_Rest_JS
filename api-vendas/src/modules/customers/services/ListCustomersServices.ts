import { getCustomRepository } from "typeorm";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

class ListCustomersService {
    public async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomerRepository);

        const customers = await customersRepository.find();

        return customers;
    }
}

export default ListCustomersService;