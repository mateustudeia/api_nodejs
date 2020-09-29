import { Request, Response } from  'express';
import db from '../database/connection';

export default class FilmeController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        const nome = filters.nome as string;
        const nome_diretor = filters.nome_diretor as string;
        const genero = filters.genero as string;
        const atores = filters.atores as string;    

        if (!filters.nome && !filters.nome_diretor && !filters.genero && !filters.atores) {
            return response.status(400).json({
                error: 'Não foi informado nenhum filtro para filmes'
            });
        }

        const filmes = await db('filme')
            .where('filme.nome', '=', String(nome)) 
            .orWhere('nome_diretor', String(nome_diretor))
            .orWhere('genero', String(genero))
            .orWhere('atores', String(atores))
            .select('*')
        
        return response.json(filmes) 
    }
    async create (request: Request, response: Response) {
        const {
            nome,
            nome_diretor,
            genero,
            atores,
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx ('filme').insert({
                nome,
                nome_diretor,
                genero,
                atores,
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
    async vote(request: Request, response: Response)  {
        const {
            usuario_id,
            filme_id,
            valor_voto,
        } = request.body;

        const trx = await db.transaction();
        
        try {
            await trx ('voto')
                .whereExists(function() {
                    this.select('usuario.*')
                        .from('usuario')
                        .whereRaw('`usuario`.`id` = ??', usuario_id)
                })
                .whereExists(function() {
                    this.select('filme.* = ')
                        .from('filme')
                        .whereRaw('`filme`.`id` = ??', filme_id)
                })
                .insert({
                    usuario_id,
                    filme_id,
                    valor_voto,
                });
            
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
