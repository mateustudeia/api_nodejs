import { Request, Response } from  'express';
import db from '../database/connection';

interface FilmeModel {
    nome: string;
    nome_diretor: string;
    genero: string;
    atores: string;
}

export default class FilmeController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        const nome = filters.name as string;
        const nome_diretor = filters.nome_diretor as string;
        const genero = filters.genero as string;
        const atores = filters.atores as string;

        if (!filters.nome && !filters.nome_diretor && !filters.genero && !filters.atores) {
            return response.status(400).json({
                error: 'Não foi informado nenhum filtro para filmes'
            });
        }

        const filmes = await db('filme')
            .where('`filme`.`nome` = ??', [String(nome)]) 
            .or.where('`filme`.`nome_diretor` = ??', [String(nome_diretor)])
            .or.where('`filme`.`genero` = ??', [String(genero)])
            .or.where('`filme`.`atores` = ??', [String(atores)])
            .select(['filme.*']);
        
        
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
}
