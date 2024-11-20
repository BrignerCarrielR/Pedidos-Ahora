import express from 'express';
import {MenuComidaController} from "../controllers/menuComidaControllers.js";

const menuComidaRouter = express.Router();

menuComidaRouter.get('/menu_comida', MenuComidaController.getMenuComida);
menuComidaRouter.get('/menu_comida/:id', MenuComidaController.getMenuComidaId);

export default menuComidaRouter;