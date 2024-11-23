import express from 'express';
import {TemporadaController} from "../controllers/temporadaControllers.js";

const temporadaRoutes = express.Router();

temporadaRoutes.get('/temporadas', TemporadaController.getTemporadas)
temporadaRoutes.get('/temporadas/:id', TemporadaController.getTemporada)
temporadaRoutes.post('/temporadas', TemporadaController.postTemporada)
temporadaRoutes.put('/temporadas/:id', TemporadaController.putTemporada)

export default temporadaRoutes;