import pool from '../database/db.js';

export class CarritoModel {
    // metodo para consultar tu carrito
    static async listaCarritos(id) {
        const db = await pool.connect()
        try {
            const query = 'select mc.nombre_plato , dc.cantidad, dc.precio, dc.total from detalle_carrito dc, menu_comidas mc, carrito c, usuarios u where u.id = c.id_usuario and c.id = dc.id_carrito and dc.id_menu_comida = mc.id and u.id = $1';
            const values = [id];
            const result = await db.query(query, values);
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
            const query = 'CALL agregar_al_carrito($1, $2, $3)'
            const values = [id_usuario, id_comida, cantidad]
            await db.query(query, values)
            return {message:'Pedido agregado al carrito'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}