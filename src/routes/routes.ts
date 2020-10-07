import express from 'express';
import FilmeController from '../controllers/FilmeController';
import UsuarioController from '../controllers/UsuarioController';
import AdministradorController from '../controllers/AdministradorController';
import VotoController from '../controllers/VotoController';

const routes = express.Router();
const usuarioControllers = new UsuarioController(); 
const filmeControllers = new FilmeController();
const administradorControllers = new AdministradorController();
const votoControllers = new VotoController();

routes.post('/usuario', usuarioControllers.create);
routes.put('/usuario', usuarioControllers.put)
routes.delete('/usuario', usuarioControllers.delite);

routes.post('/adminstrador', administradorControllers.create);
routes.put('/adminstrador', administradorControllers.put)
routes.delete('/adminstrador', administradorControllers.delite);

routes.get('/filme', filmeControllers.index);
routes.post('/filme', filmeControllers.create);
routes.get('/filme/detalhe', filmeControllers.details)

routes.post('/votar', votoControllers.vote);


export default routes;