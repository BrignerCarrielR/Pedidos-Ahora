import express from 'express';
import { CarritoController} from "../controllers/carritoControllers.js";

const carritoRouter = express.Router();

carritoRouter.get('/mi_carrito/:id', CarritoController.getCarritos);
carritoRouter.post('/agregar_pedido_carrito', CarritoController.ingresarPedido)
carritoRouter.delete('/eliminar_nenu_pedido/:id', CarritoController.deleteControllerMenuPedido)

export default carritoRouter;