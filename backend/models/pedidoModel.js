import pool from "../database/db.js";
import {query} from "express";
import {queries} from "../database/queries.js";

export class PedidoModel {
    // metodo para consultar los pedidos. funciona con el historial en el front validamos que solo se muestren
    // los que tienen el estado de 'Entregados'
    static async getPedidos() {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarPedidos);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para ver los pedidos de cada usuario
    static async getPedido(id) {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarPedido, [id])
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para ver los detalles de un pedido
    static async getDetallePedido(id) {
        const db = await pool.connect(); // Obtiene una conexión del pool
        try {
            const result = await db.query(queries.consultarDetallesPedido, [id]);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo confirmar pedido
    static async createPedido(pedido) {
        const {id} = pedido;

        const db = await pool.connect(); // Conexión del pool

        try {
            await db.query(queries.callCreatePedido, [id]);
            return {message: "Pedido creado con éxito"}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para cancelar un  pedido en por parte del usuario
    static async getCancelarPedido(id) {
        const db = await pool.connect()
        try {
            await db.query(queries.modificarPedidoCancelado, [id]);
            return {message: 'El pedido se cancelo de manera correcta'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // administrar los pedidos para administradores
    static async getPedidosAdmin(id) {
        const db = await pool.connect()
        try {
            await db.query(queries.modificarPedidoEnviado, [id]);
            return {message: 'El pedido se ha enviado de manera correcta'};
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}