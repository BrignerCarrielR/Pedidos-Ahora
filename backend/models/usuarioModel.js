import pool from "../database/db.js";
import bcrypt from "bcrypt";

export class UsuarioModel {
    // metodo para consultar a los usuarios
    static async getUsuarios() {
        const db = await pool.connect()
        try {
            const query = `SELECT * FROM usuarios`;

            const result = await db.query(query);
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
            const query = `SELECT * FROM usuarios WHERE id = $1`;
            const values = [id];

            const result = await db.query(query,values);
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
            console.log(nombreUsuario, correo, contrasena, telefono, direccion);
            if (typeof nombreUsuario !== "string" || nombreUsuario.trim() === "" ) throw new Error("El nombre no es valido");
            if (contrasena.length < 8 || contrasena.length > 16) throw  new  Error('La debe tener entre 8 y 16 caracteres')
            if (telefono.length !== 10) throw  new  Error('El telefono debe tener  10 caracteres')

            // encriptamos la contraseña
            const hashedContrasena = await bcrypt.hashSync(contrasena, 10);

            const query = `
            INSERT INTO usuarios (nombreUsuario, correo, contrasena, telefono, direccion)
            VALUES($1, $2, $3, $4, $5) RETURNING *; 
            `;
            const values = [nombreUsuario, correo, hashedContrasena, telefono, direccion];

            const result = await db.query(query, values);
            return result.rows;
        }
        catch(error){
            throw error;
        } finally {
            db.release();
        }
    }


}