import {CarritoModel} from "../models/carritoModel.js";

export class CarritoController {
    // consultar tu carrito
    static  async getCarritos(req, res) {
        try {
            const data = await CarritoModel.listaCarritos(req.params.id);
            res.status(200).json(data)
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los carritos"
            })
        }
    }
    // ingresar pedido al carrito
    static async ingresarPedido(req, res){
        try{
            const data = await CarritoModel.insertarPedido(req.body);
            res.status(200).send(data)
        } catch(error){
            res.status(500).send({
                message: error.message || "Error al insertar pedido en el carrito."
            })
        }
    }
}