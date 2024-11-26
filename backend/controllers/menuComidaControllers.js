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

    // creamos un nuevo plato
    static async postMenuComida(req, res) {
        try{
            const {nombre_plato, descripcion, precio} = req.body;

            // validamos nombre_plato: debe ser una cadena no vacia
            if (typeof nombre_plato !== "string" || nombre_plato.trim() === "") {
                return res.status(400).send({ message: "El nombre del plato no es válido" });
            }
            // valiodamos la descripcion;: no puede estar vacia y debe ser una cadena
            if (typeof descripcion !== "string" || descripcion.trim() === "") {
                return res.status(400).send({ message: "La descripción no es válida" });
            }
            // validamos el precio: deber ser un numero mayor a 0
            if (typeof precio !== "number" || precio <= 0) {
                return res.status(400).send({ message: "El precio debe ser un número mayor que 0" });
            }

            const data = await MenuComidaModel.postMenuComida(req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el menu"
            });
        }
    }

    // modificamos un plato
    static async putMenuComida(req, res) {
        try{
            const {nombre_plato, descripcion, precio,} = req.body;
            // validamos nombre_plato: debe ser una cadena no vacia
            if (typeof nombre_plato !== "string" || nombre_plato.trim() === "") {
                return res.status(400).send({ message: "El nombre del plato no es válido" });
            }
            // valiodamos la descripcion;: no puede estar vacia y debe ser una cadena
            if (typeof descripcion !== "string" || descripcion.trim() === "") {
                return res.status(400).send({ message: "La descripción no es válida" });
            }
            // validamos el precio: deber ser un numero mayor a 0
            if (typeof precio !== "number" || precio <= 0) {
                return res.status(400).send({ message: "El precio debe ser un número mayor que 0" });
            }

            const data = await MenuComidaModel.putMenuComida(req.params.id, req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el menu"
            });
        }
    }
    // obtener el listado del tipo de comidas
    static async getTipoComida(req, res) {
        try {
            const data = await MenuComidaModel.getTipoComida();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los menus"
            });
        }
    }
}