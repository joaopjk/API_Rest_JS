import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const userEmailExists = await usersRepository.findByEmail(email);
        if (userEmailExists) {
            throw new AppError(`${email} já cadastrado em nosso site!`);
        }

        const user = usersRepository.create({
            name, email, password
        });

        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;