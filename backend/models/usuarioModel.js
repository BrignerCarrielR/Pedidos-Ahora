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
            const result = await db.query(queries.consultarUsuario,[id]);
            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            db.release();
        }
    }

    // metodo para crear un nuevo usuario
    static async createUsuario(usuario) {
        const db = await pool.connect()
        try{
            const { nombreUsuario, correo, contrasena, telefono, direccion } = usuario;
            // encriptamos la contraseña
            const hashedContrasena = await bcrypt.hashSync(contrasena, 10);

            const values = [nombreUsuario, correo, hashedContrasena, telefono, direccion];
            const result = await db.query(queries.crearUsuario, values);
            return result.rows;
        }
        catch(error){
            throw error;
        } finally {
            db.release();
        }
    }
}