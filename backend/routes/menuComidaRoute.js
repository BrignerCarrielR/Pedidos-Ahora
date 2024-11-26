import express from 'express';
import {MenuComidaController} from "../controllers/menuComidaControllers.js";

const menuComidaRouter = express.Router();

menuComidaRouter.get('/menu_comida', MenuComidaController.getMenuComida);
menuComidaRouter.get('/menu_comida/:id', MenuComidaController.getMenuComidaId);
menuComidaRouter.post('/menu_comida', MenuComidaController.postMenuComida);
menuComidaRouter.put('/menu_comida/:id', MenuComidaController.putMenuComida);

menuComidaRouter.get('/tipo_comida', MenuComidaController.getTipoComida);

export default menuComidaRouter;