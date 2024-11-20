import {PedidoModel} from "../models/pedidoModel.js";

export class PedidoController {
    static async getPedidos(req, res) {
        try {
            const data = await PedidoModel.getPedidos();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los pedidos"
            });
        }
    }
    static async getPedido(req, res) {
        try{
            const data = await PedidoModel.getPedido(req.params.id);
            res.status(200).send(data);
        }catch(error){
            res.status(500).send({
                message: error.message || "Error al obtener el pedido"
            });
        }
    }
    static async getDetallePedido(req, res) {
        try{
            const data = await PedidoModel.getDetallePedido(req.params.id);
            res.status(200).send(data);
        }catch(error){
            res.status(500).send({
                message: error.message || "Error al obtener el detalle del pedido"
            });
        }
    }
    static async createPedido(req, res) {
        try{
            const data = await PedidoModel.createPedido(req.body);
            res.status(200).send(data);
        }catch(error){
            res.status(500).send({
                message: error.message || "Error al crear el pedido"
            });
        }
    }

    static async CancelarPedido(req, res) {
        try{
            const data = await PedidoModel.getCancelarPedido(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({message: error.message || "Error al crear el pedido"})
        }
    }

    static async ConfirmarPedido(req, res) {
        try {
            const data = await  PedidoModel.getPedidosAdmin(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al actualizar el pedido"
            });
        }
    }
}