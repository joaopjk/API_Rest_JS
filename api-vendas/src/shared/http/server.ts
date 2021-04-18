/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes/index';
import AppError from '../errors/AppError';
import '../typeorm';

const app = express();

app.use(cors()); //Configurando o Cors na aplicação
app.use(express.json()); //Configurando para api aceitar Json
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'Error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
); //Configuração do tratamento de erros

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
