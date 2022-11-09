import { AppDataSource } from './data-source';
import express from "express";
import cors from 'cors';
import routes from './routes';
// instanciando a aplicação express
const app = express();

// porta de execucao 
const PORT = 3301;

//Middleware
app.use(cors())
app.use(express.json())

// importa as rotas
app.use('/backoffice', routes)

AppDataSource.initialize().then(() => {
        //inicia
        app.listen(PORT, () => console.log(`ta ligado na ${PORT}`))
    }).catch(reason => {
        console.log('ocorreu um erro:')
        console.error(reason)
    })


