import pool from "../database/db.js";
import bcrypt from "bcrypt";
import {queries} from "../database/queries.js";

export class UsuarioModel {
    // metodo para consultar a los usuarios
    static async getUsuarios() {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarUsuario);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para consultar un usuario en particular
    static async getUsuario(id) {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarUsuario, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para crear un nuevo usuario
    static async createUsuario(usuario) {
        const db = await pool.connect()
        try {
            const {nombreUsuario, correo, contrasena, telefono, direccion} = usuario;
            // encriptamos la contraseña
            const hashedContrasena = await bcrypt.hashSync(contrasena, 10);

            const values = [nombreUsuario, correo, hashedContrasena, telefono, direccion];
            const result = await db.query(queries.crearUsuario, values);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para consultar tu lista de favoritos
    static async getFavoritos(id) {
        const db = await pool.connect()
        try {
            const result = await db.query(queries.consultarFavoritos, [id]);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para crear los favoritos
    static async postFavorito(favorito) {
        const db = await pool.connect()
        try {
            const {id_usuario, id_plato} = favorito;
            const values = [id_usuario, id_plato];
            await db.query(queries.insertarFavorito, values)
            return {message: 'Se añadió correctamente a favoritos.'}
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para eliminar un favorito
    static async deleteFavorito(id) {
        const db = await pool.connect()
        try {
            await db.query(queries.eliminarFavorito, [id]);
            return {message: 'Se eliminó correctamente de favoritos.'}
        } catch (error) {
            throw error
        } finally {
            db.release()
        }
    }

    // metodo para editar un usuario
    static async putUsuario(id, usuarios) {
        const db = await pool.connect()
        try {
            const {usuario, direccion} = usuarios;
            const values = [usuario, direccion, id];
            await db.query(queries.editarUsuario, values);
            return {message: 'Se edito correctamente el usuario.'}
        } catch (error) {
            throw error
        } finally {
            db.release()
        }
    }
}