import pool from '../database/db.js';
import {queries} from "../database/queries.js";

export class CarritoModel {
    // metodo para consultar tu carrito
    static async listaCarritos(id) {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarCarritos, [id]);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo instertar pedido al carrito
    static async insertarPedido(pedido) {
        const db = await pool.connect()
        try {
            const {id_usuario, id_comida, cantidad} = pedido
            const values = [id_usuario, id_comida, cantidad]
            await db.query(queries.callAgregarCarrito, values)
            return {message: 'Pedido agregado al carrito'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para eliminar un menu del carrito
    static async deleteMenuPedido(id) {
        const db = await pool.connect()
        try {
            await db.query(queries.eliminarMenuCarrito, [id])
            return {message: 'Pedido eliminado del carrito'}
        } catch (error) {
            throw error
        } finally {
            db.release();
        }
    }
}