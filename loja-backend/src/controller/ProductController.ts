import { Product } from './../entity/Product';
import { Request, Response } from "express";
import { TypeORMError } from 'typeorm';


class ProductController {


    public async index(request: Request, response: Response) {
        try {
            // buscar todos os registros
            const found = await Product.find();

            return response.json(found);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({ message: error.message });
        }
    }

    public async create(request: Request, response: Response) {
        try {
            // cria um registro
            const obj = await Product.save(request.body);

            return response.status(201).json(obj);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({ message: error.message });
        }
    }

    public async show(request: Request, response: Response) {
        try {
            const {id} = request?.params;
            if (!id) {
                return response.status(400).json({message: 'Faltou o id'})
            }
            
            // buscar todos os registros
            const found = await Product.findOneBy({id: Number(id)});
            if (!found) {
                return response.status(404).json({message: 'Registro não encontrado'})
            }

            return response.json(found);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({ message: error.message });
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const {id} = request?.params;
            if (!id) {
                return response.status(400).json({message: 'Faltou o id'})
            }
            
            // buscar todos os registros
            const found = await Product.findOneBy({id: Number(id)});
            if (!found) {
                return response.status(404).json({message: 'Registro não encontrado'})
            }

            await Product.update(request.body.id, request.body);
            const saved = request.body;
            saved.id = found.id;

            return response.json(saved);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({ message: error.message });
        }
    }

    public async remove(request: Request, response: Response) {
        try {
            const {id} = request?.params;
            if (!id) {
                return response.status(400).json({message: 'Faltou o id'})
            }
            
            // buscar todos os registros
            const found = await Product.findOneBy({id: Number(id)});
            if (!found) {
                return response.status(404).json({message: 'Registro não encontrado'})
            }

            await found.remove();

            return response.status(204).json();
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({ message: error.message });
        }
    }
}

export default new ProductController();