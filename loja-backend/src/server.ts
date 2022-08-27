import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';

//instancio uma aplicação express
const app = express(); 

//Determina a porta de execução
const PORT = 3300;

//Middleware
app.use(cors());
app.use(express.json());

//importa as rotas
app.use('/server', routes)

//tento conectar ao banco e se nao conseguir mostro o erro
AppDataSource.initialize()
   .then(() => {

    app.listen(PORT, () => {
        console.log(`Running in port ${PORT}`);
    });

   })

.catch(error => {
console.log('Ops, ocorreu um erro');
console.error(error);
});