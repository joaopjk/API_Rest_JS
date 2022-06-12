import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UsersRepository copy";

interface IRequest {
    email: string;
}

class SendForgotPasswordServiceEmailService {
    public async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Usuário não encontrado!", 404);
        }

        const token = await userTokensRepository.generate(user.id);

        console.log(token);
    }
}

export default SendForgotPasswordServiceEmailService;