import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ICustomerId } from "../domain/models/ICustomerId";
import Customer from "../infra/typeorm/entities/Customer";
import CustomerRepository from "../infra/typeorm/repositories/CustomerRepository";

class DeleteCustomerService {
    public async execute({ id }: ICustomerId): Promise<void> {
        const customersRepository = getCustomRepository(CustomerRepository);

        const customer = await customersRepository.findById(id);
        if (!customer)
            throw new AppError("Cliente não encontrado!", 404);

        await customersRepository.remove(customer);
    }
}

export default DeleteCustomerService;