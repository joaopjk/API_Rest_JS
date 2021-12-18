import express from "express";
import cors from 'cors';
import routes from "./routes";

const app = express();
app.use(cors()); //Aceitando qualquer origem
app.use(express.json()) //Configurando a aplicação para interpretar Json
app.use(routes);

app.listen(3333, () => {
    console.log("Server started on port 3333!");
})