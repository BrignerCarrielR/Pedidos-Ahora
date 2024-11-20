import {MenuComidaModel} from "../models/menuComidaModel.js";

export class MenuComidaController {
    // obtener el menu de las comidas
    static async getMenuComida(req, res) {
        try {
            const data = await MenuComidaModel.getMenuComida();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }
    // obtenemos una comidad en especifico
    static async getMenuComidaId(req, res) {
        try{
            const data = await MenuComidaModel.getMenuComidaId(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el menu"
            });
        }
    }
}