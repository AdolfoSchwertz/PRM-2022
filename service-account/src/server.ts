import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';


//carrego as variaveis de ambiente da aplicação
dotenv.config


//instancio uma aplicação express
const app = express();

//Determina a porta de execução
const PORT = process.env.PORT || 3302;

//Middleware
app.use(cors());
app.use(express.json());

//importa as rotas
app.use('/account', routes)

//tento conectar ao banco e se nao conseguir mostro o erro

//inicio a aplicacao
app.listen(PORT, () => {
    console.log(`Running in port ${PORT}`);
});
