import pool from "../database/db.js";
import {queries} from "../database/queries.js";

export class TemporadaModel {
    static async getTemporadas() {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarTemporadas);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async getTemporada(id) {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarTemporada, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async postTemporada(data) {
        const db = await pool.connect()
        try {
            const {nombre, tarifa, estado} = data
            const values = [nombre, tarifa, estado];
            await db.query(queries.insertarTemporada, values)
            return {message: 'El plato se creó correctamente.'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    static async putTemporada(id, data) {
        const db = await pool.connect()
        try {
            const {nombre, tarifa, estado} = data
            const values = [nombre, tarifa, estado, id];
            await db.query(queries.modificarTemporada, values)
            return {message: 'El plato se creó correctamente.'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}