import express from 'express';
import FilmeController from '../controllers/FilmeController';
import UsuarioController from '../controllers/UsuarioController';

const routes = express.Router();
const usuarioControllers = new UsuarioController(); 
const filmeControllers = new FilmeController();

routes.post('/usuario', usuarioControllers.create);

routes.get('/filme', filmeControllers.index);
routes.post('/filme', filmeControllers.create);
routes.post('/votar_filme', filmeControllers.vote);


export default routes;