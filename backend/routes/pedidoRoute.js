import express from "express";
import { PedidoController} from "../controllers/pedidoControllers.js";

const pedidosRouter = express.Router();

pedidosRouter.get('/pedidos', PedidoController.getPedidos);
pedidosRouter.get('/pedidos/:id', PedidoController.getPedido);
pedidosRouter.get('/pedidos/detalles/:id', PedidoController.getDetallePedido);
pedidosRouter.get('/cancelar_pedido/:id', PedidoController.CancelarPedido);
pedidosRouter.post('/pedidos', PedidoController.createPedido);
pedidosRouter.get('/confirmar_pedidos/:id', PedidoController.ConfirmarPedido);

export default pedidosRouter;