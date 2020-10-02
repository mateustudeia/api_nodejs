import { Request, Response } from  'express';
import db from '../database/connection';

export default class VotoController {

    async vote(request: Request, response: Response)  {
        const {
            usuario_id,
            filme_id,
            valor_voto,
        } = request.body;

        const trx = await db.transaction();
        
        try {
            const usuario = await trx('usuario')
                .where('id', '=', Number(usuario_id)) 
                .select('id')
                .first();
            const filme = await trx('filme')
                .where('id', '=', Number(filme_id)) 
                .select('id')
                .first();
            
            const usuarioId = usuario?.id;
            const filmeId = filme?.id;

            await trx ('voto_usuario_filme').insert({
                    usuario_id: usuarioId,
                    filme_id: filmeId,
                    valor_voto,
            })
            
            await trx.commit();
    
            return response.status(201).send();
            
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao registrar voto'
            });
        }
    } 
}