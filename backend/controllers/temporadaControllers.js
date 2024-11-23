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
            const data = await TemporadaModel.putTemporada(req.params.id, req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }
}