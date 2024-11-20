import pool from "../database/db.js";

export class MenuComidaModel {
    // metodo para devolver el listado del menú de las comidas
    static async getMenuComida() {
        const db = await pool.connect()
        try {
            const query = `SELECT  * FROM menu_comidas`;

            const result = await db.query(query);
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
            const query = `SELECT  * FROM menu_comidas WHERE id = $1`;
            const values = [id];

            const result = await db.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }
}