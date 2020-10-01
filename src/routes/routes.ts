import express from 'express';
import FilmeController from '../controllers/FilmeController';
import UsuarioController from '../controllers/UsuarioController';

const routes = express.Router();
const usuarioControllers = new UsuarioController(); 
const filmeControllers = new FilmeController();

routes.post('/usuario', usuarioControllers.create);
routes.put('/usuario', usuarioControllers.update)
routes.delete('/usuario', usuarioControllers.delite);

routes.post('/adminstrador', usuarioControllers.create);
routes.put('/adminstrador', usuarioControllers.update)
routes.delete('/adminstrador', usuarioControllers.delite);

routes.get('/filme', filmeControllers.index);
routes.post('/filme', filmeControllers.create);
routes.post('/filme/votar', filmeControllers.vote);


export default routes;