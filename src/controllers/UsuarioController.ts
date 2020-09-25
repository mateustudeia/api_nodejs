import { Request, Response } from  'express';
import db from '../database/connection';

export default class UsuarioController {
    async create (request: Request, response: Response) {
        const {
            nome,
            email,
            password,
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx ('usuario').insert({
                nome,
                email,
                password,
                usuario_desativado: false,
                admin_desativado: true
                
            });
    
            await trx.commit();
    
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao cadastrar um usuário'
            });
        }
    }

    async update (request: Request, response: Response) {
        
    }

    async delite (request: Request, response: Response) {

    }
}
