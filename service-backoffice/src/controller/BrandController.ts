import { Brand } from "../entity/Brand";
import {Request, Response } from "express";
import { TypeORMError } from "typeorm";

class BrandController {

    public async index(request: Request, response: Response) {
        try {
            //buscar todos os registros do banco
            const brands = await Brand.find();

            //retorna a lista
            return response.json(brands);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async create(request: Request, response: Response) {
        try {
            //salvo no banco a entidade que veio na requisicao
            const brand = await Brand.save(request.body);

            //retorna a lista
            return response.status(201).json(brand);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async show(request: Request, response: Response) {
        try {
            //Pego o id que foi enviado por request param
            const {id} = request.params;

            //verifico se veio o parametro id
            if(!id) {
                return response.status(400).json({message:
                'parametro id nao informado'})
            }

            //busco a entity no banco pelo id
            const found = await Brand.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a brand
            if (!found) {
                return response.status(404).json({message:
                'recurso nao encontrado'})
            }

            //retorna a entidade encontrada
            return response.json(found);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async update(request: Request, response: Response) {
        try {
            //Pego o id que foi enviado por request param
            const {id} = request.params;

            //verifico se veio o parametro id
            if(!id) {
                return response.status(400).json({message:
                'parametro id nao informado'})
            }

            //busco a entity no banco pelo id
            const found = await Brand.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a brand
            if (!found) {
                return response.status(404).json({message:
                'recurso nao encontrado'})
            }

            //Atualizo com os novos dados
            await Brand.update(found.id, request.body)

            const novo = request.body

            //altero o id para o que veio no request
            novo.id = found.id;


            //retorna a entidade encontrada
            return response.json(novo);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async remove(request: Request, response: Response) {
        try {
            //Pego o id que foi enviado por request param
            const {id} = request.params;

            //verifico se veio o parametro id
            if(!id) {
                return response.status(400).json({message:
                'parametro id nao informado'})
            }

            //busco a entity no banco pelo id
            const found = await Brand.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a brand
            if (!found) {
                return response.status(404).json({message:
                'recurso nao encontrado'})
            }

            //removo o registro baseado no id
            await found.remove();

            //retorno status 204, que ?? sem retorno
            return response.status(204).json();

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }
}


export default new BrandController();