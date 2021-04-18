import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(cors()); //Configurando o Cors na aplicação
app.use(express.json()); //Configurando para api aceitar Json
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
