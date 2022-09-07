import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';
import dotenv from 'dotenv';
import { env } from 'process';

//carrego variaveis de ambiente
dotenv.config();

//instancio uma aplicação express
const app = express(); 

//Determina a porta de execução
const PORT = process.env.PORT || 3301;

//Middleware
app.use(cors());
app.use(express.json());

//importa as rotas
app.use('/backoffice', routes)

//tento conectar ao banco e se nao conseguir mostro o erro
AppDataSource.initialize()
   .then(() => {

    app.listen(PORT, () => {
        console.log(`Service backoffice running in port ${PORT}`);
    });

   })

.catch(error => {
console.log('Ops, ocorreu um erro');
console.error(error);
});