import pool from "../database/db.js";
import {queries} from "../database/queries.js";

export class MenuComidaModel {
    // metodo para devolver el listado del menú de las comidas
    static async getMenuComida() {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarComidas);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para devolver el listado del menú de las comidas
    static async getMenuComidaId(id) {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarComida, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para crear un nuevo plato
    static async postMenuComida(data) {
        const db = await pool.connect()
        try {
            const {nombre_plato, descripcion, precio, tipo_comida_id, imagen} = data
            const values = [nombre_plato, descripcion, precio, tipo_comida_id, imagen];
            await db.query(queries.insertarComida, values)
            return {message: 'El plato se creó correctamente.'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para actualizar un plato
    static async putMenuComida(id, data) {
        const db = await pool.connect()
        try {
            const {nombre_plato, descripcion, disponible, precio, tipo_comida_id, imagen} = data
            const values = [nombre_plato, descripcion, disponible, precio, tipo_comida_id, imagen, id];
            await db.query(queries.modificarComida, values)
            return {message: 'El plato se actualizó correctamente.'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}