import { Request, Response } from 'express';
import db from '../database/connection';
import UsuarioController from './UsuarioController'

export default class AdministradorController {
    
    async create(request: Request, response: Response) {
        const {
            usuario_id,
        } = request.body;

        const trx = await db.transaction();
    
        try {
            
            const usuario = await trx('usuario')
                .where('id', '=', Number(usuario_id)) 
                .select('id')
                .first();
            
            await trx ('administrador').insert({
                usuario_id: usuario?.id,
                admin_desativado: false,
                data_cadastro: Date.now()
            });
    
            await trx.commit();
    
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao cadastrar um administrador'
            });
        }
    }

    async put(request: Request, response: Response) {
        const {
            id,
            admin_desativado,
        } = request.body;
        
        const trx = await db.transaction();

        try {

            await trx ('administrador')
                .where('id', '=', Number(id)) 
                .update({
                    admin_desativado
                });
    
            await trx.commit();
    
            return response.status(200).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao editar o administrador'
            });
        }
    }

    async delite(request: Request, response: Response) {
        const {
            id,
        } = request.body;

        const trx = await db.transaction();
        try {
            await trx ('administrador')
                .where('id', '=', Number(id)) 
                .update({
                    admin_desativado: true
                });
    
            await trx.commit();
    
            return response.status(200).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao deletar o usuário'
            });
        }
    }
}