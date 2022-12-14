import {Request, Response } from "express";
import { NoVersionOrUpdateDateColumnError, TypeORMError, UpdateDateColumn } from "typeorm";
import { Order } from "../entity/Order";

class OrderController {

    public async index(request: Request, response: Response) {
        try {
            //buscar todos os registros do banco
            const orders = await Order.find();

            //retorna a lista
            return response.json(orders);

        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message})
        }
    }

    public async create(request: Request, response: Response) {
        try {
            //salvo no banco a entidade que veio na requisicao
            const order = await Order.save(request.body);

            //retorna a lista
            return response.status(201).json(order);

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
            const found = await Order.findOneBy({
                id: Number(id)
            })

            //verifico se encontrou a order
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

    public async canceled(request: Request, response: Response) {
        try {
            //Pego o ID que foi enviado por request param
            const {id} = request.params;

            //Verifico se veio o parametro ID
            if (!id) {
                return response.status(400).json({message: 'Par??metro ID n??o informado'})
            }

            //Busco a entity no banco pelo ID
            const found = await Order.findOneBy({
                id: Number(id)
            });

            //Verifico se encontrou a order
            if (!found) {
                return response.status(404).json({message: 'Recurso n??o encontrado'})
            }

            //Determina a data de cancelamento (este campo indica que o pedido est?? cancelado)
            request.body.canceledDate = new Date();

            //Atualizo com os nos dados
            await Order.update(found.id, request.body);

            const novo = request.body;

            //Altero o ID para o que veio no request
            novo.id = found.id;

            //Retorno a entidade encontrada
            return response.json(novo);
        } catch (e) {
            const error = e as TypeORMError;
            return response.status(500).json({message: error.message});
        }
    }
    




   
}


export default new OrderController();