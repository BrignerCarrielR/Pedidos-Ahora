import pool from "../database/db.js";
import {query} from "express";

export class PedidoModel {
    // metodo para consultar los pedidos. funciona con el historial en el front validamos que solo se muestren
    // los que tienen el estado de 'Entregados'
    static async getPedidos() {
        const db = await pool.connect()
        try {
            const query = `select p.id, u.nombreusuario, fecha_pedido, p.estado, p.total from pedidos p, usuarios u where u.id = p.id_usuario order by estado desc `

            const result = await db.query(query)
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
            const query = `select * from pedidos p   where id_usuario = $1 order by estado desc`
            const values = [id]

            const result = await db.query(query, values)
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
            const query = `SELECT * FROM detalle_pedido WHERE id_pedido = $1`; // Consulta SQL
            const values = [id]; // Parámetros para la consulta (id del pedido)
            // Ejecutar la consulta
            const result = await db.query(query, values);
            // Devolver los resultados al callback
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
            const query = `CALL confirmar_pedido($1)`;
            const values = [id];
            const result = await db.query(query, values);
            // Puedes loguear el resultado de la consulta si es necesario
            console.log(result); // Muestra los resultados de la llamada
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
            const query = `UPDATE pedidos set estado = 'Cancelado' where id = $1`
            const values = [id];
            await db.query(query, values);

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
            const query = `update pedidos set estado = 'Enviado' where id = $1`;
            const values = [id];

            await db.query(query, values);
            return {message: 'El pedido se ha enviado de manera correcta'};
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}