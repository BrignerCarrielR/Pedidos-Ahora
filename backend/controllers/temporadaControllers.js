import {TemporadaModel} from "../models/temporadaModel.js";

export class TemporadaController {
    static async getTemporadas(req, res) {
        try {
            const data = await TemporadaModel.getTemporadas();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }

    static async getTemporada(req, res) {
        try {
            const data = await TemporadaModel.getTemporada(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }

    static async postTemporada(req, res) {
        try {
            const { nombre, tarifa} = req.body;
            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).send({ message: 'El nombre es obligatorio y debe ser una cadena no vacía.' });
            }
            if (!tarifa || typeof tarifa !== 'number' || tarifa <= 0) {
                return res.status(400).send({ message: 'La tarifa es obligatoria y debe ser un número positivo.' });
            }

            const data = await TemporadaModel.postTemporada(req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }

    static async putTemporada(req, res) {
        try {
            const { nombre, tarifa} = req.body;
            if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
                return res.status(400).send({ message: 'El nombre es obligatorio y debe ser una cadena no vacía.' });
            }
            if (!tarifa || typeof tarifa !== 'number' || tarifa <= 0) {
                return res.status(400).send({ message: 'La tarifa es obligatoria y debe ser un número positivo.' });
            }

            const data = await TemporadaModel.putTemporada(req.params.id, req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }
}