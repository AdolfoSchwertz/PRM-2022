import {Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { Customer } from "../entity/Customer";

class CustomerController {

    public async index(request: Request, response: Response) {
        try {
            //buscar todos os registros do banco
            const customers = await Customer.find();

            //retorna a lista
            return response.json(customers);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async create(request: Request, response: Response) {
        try {
            //salvo no banco a entidade que veio na requisicao
            const customer = await Customer.save(request.body);

            //retorna a lista
            return response.status(201).json(customer);

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
            const found = await Customer.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a customer
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
            const found = await Customer.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a customer
            if (!found) {
                return response.status(404).json({message:
                'recurso nao encontrado'})
            }

            //Atualizo com os novos dados
            await Customer.update(found.id, request.body)

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
            const found = await Customer.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a customer
            if (!found) {
                return response.status(404).json({message:
                'recurso nao encontrado'})
            }

            //removo o registro baseado no id
            await found.remove();

            //retorno status 204, que é sem retorno
            return response.status(204).json();

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }
}


export default new CustomerController();