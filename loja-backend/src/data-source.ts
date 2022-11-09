import 'reflect-metadata';
import { Product } from './entity/Product';
import { Category } from './entity/Category';
import { DataSource } from "typeorm";
import { Brand } from "./entity/Brand";

export const AppDataSource = new DataSource(
    {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'Koihw2017',
        database: 'prmdb',
        synchronize: true,
        logging: true,
        entities: [Brand, Category, Product]
    }
)