import { Request, Response } from 'express';
import db from '../database/connection';
import calcularMediaVotos from '../utils/calcularMediaVotos';

interface FilmeModel {
    titulo: String;
    ano: Number;
    tempo_duracao: Number;
    enredo: String;
    escritores: String;
    diretor: String;
    genero: String;
    atores: String;
    mediaFotos: Number; 
}


export default class FilmeController {

    async details(request: Request, response: Response) {
        const {
            filme_id,
        } = request.body;
        try {
            const filmes = await db('filme')
            .where('id', '=', Number(filme_id))
            .first('*');

            console.log(filmes)
        
        const totalVotos = await db('voto_usuario_filme')
            .where('filme_id','=', Number(filme_id))
            .sum('valor_voto')
            .count();
        console.log(filmes);
        const filme = filmes.map((filme: FilmeModel) => {
            return {
                titulo: filme.titulo,
                ano: filme.ano,
                tempo_duracao: filme.tempo_duracao,
                enredo: filme.enredo,
                escritores: filme.escritores,
                diretor: filme.diretor,
                genero: filme.genero,
                atores: filme.atores,
                mediaFotos: calcularMediaVotos(totalVotos[0].sum, totalVotos[0].count),
            };
        });
        console.log(dadosFilme)    

        return response.json(dadosFilme)
        } catch(err) {
            return response.status(400).json({
                error: "erro ao buscar dados do filme"
            })
        }
        
    }
    async index(request: Request, response: Response) {
        const filters = request.query;

        const titulo = filters.titulo as string;
        const diretor = filters.diretor as string;
        const genero = filters.genero as string;
        const atores = filters.atores as string;    

        if (!filters.titulo && !filters.diretor && !filters.genero && !filters.atores) {
            return response.status(400).json({
                error: 'Não foi informado nenhum filtro para filmes'
            });
        }

        const filmes = await db('filme')
            .where('titulo', '=', String(titulo)) 
            .orWhere('diretor', String(diretor))
            .orWhere('genero', String(genero))
            .orWhere('atores', String(atores))
        
        return response.json(filmes)
    }
    async create(request: Request, response: Response) {
        const {
            titulo,
            ano,
            tempo_duracao,
            enredo,
            escritores,
            diretor,
            genero,
            atores,
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx ('filme').insert({
                titulo,
                ano,
                tempo_duracao,
                enredo,
                escritores,
                diretor,
                genero,
                atores,
            });
    
            await trx.commit();
    
            return response.status(201).send();
        } catch (err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Erro ao cadastrar um filme'
            });
        }
        
    }


}

