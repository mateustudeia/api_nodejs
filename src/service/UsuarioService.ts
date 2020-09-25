import db from '../database/connection';

interface UsuarioModel {
    nome: string;
    email: string;
    usuario_desativado: boolean;
    admin_desativado: boolean;
}

export default class UsuarioService {
    async create (usuario: UsuarioModel) {

    }
}