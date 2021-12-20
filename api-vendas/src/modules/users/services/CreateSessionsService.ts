import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UsersRepository);

        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Usuário ou senha inválidos !", 401);
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError("Usuário ou senha inválidos !", 401);
        }

        const token = sign({}, "155ef9961868be69e62ba99e815bc3a6", {
            subject: user.id,
            expiresIn: "1d"
        });

        return { user, token };
    }
}

export default CreateSessionsService;