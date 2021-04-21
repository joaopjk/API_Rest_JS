import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from 'src/shared/errors/AppError';
import authConfig from 'src/config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }
  //Bearer token
  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token');
  }
};

export default isAuthenticated;
