import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UsersRepository copy";
import EtherealMail from "@config/mail/etherealMail";

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

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: "[Api Vendas] Recuperação de Senha:",
            templateData: {
                template: "Olá {{name}}: {{token}}",
                variables: {
                    name: user.name,
                    token: token?.token
                }
            }
        })
    }
}

export default SendForgotPasswordServiceEmailService;