/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from 'src/shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: IRequest): Promise<IResponse | undefined> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination 1', 401);
    }

    const passwordConfirmed = await compare(password, user!.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination 2', 401);
    }

    const token = sign({}, '155C4scQFd67bqPFiuHSqQkYK7jUtnwpV6', {
      subject: user!.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
