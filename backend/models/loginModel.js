import pool from "../database/db.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";


// cargamos las variables de entorno
dotenv.config();

export class LoginModel {
    // metodo para realizar el login y generar el token
    static async login(usuario) {
        const db = await pool.connect();
        try {
            const {nombreUsuario, contrasena} = usuario;
            const usuarioDB = await db.query(
                `SELECT id, nombreUsuario, contrasena FROM usuarios WHERE nombreUsuario = $1`,
                [nombreUsuario]
            );

            if (usuarioDB.rows.length === 0) {
                throw new Error("El nombre de usuario no es válido");
            }

            const {contrasena: contrasenaDB, id} = usuarioDB.rows[0];
            const contrasenaCorrecta = await bcrypt.compare(contrasena, contrasenaDB);

            if (contrasenaCorrecta) {
                // Generar tokens
                const accessToken = jwt.sign(
                    {id, nombreUsuario},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRACION}
                );

                const refreshToken = jwt.sign(
                    {id, nombreUsuario},
                    process.env.JWT_REFRESH_SECRET,
                    {expiresIn: process.env.JWT_REFRESH_EXPIRACION}
                );

                console.log('Refresh token generado:', refreshToken); // Verificación

                // Guardar refresh token en DB
                await db.query(
                    `UPDATE usuarios SET refresh_token = $1 WHERE id = $2`,
                    [refreshToken, id]
                );

                return {accessToken, refreshToken, id, nombreUsuario};
            } else {
                throw new Error("La contraseña no coincide con el usuario.");
            }
        } catch (error) {
            console.error(error); // Ver error completo
            throw error;
        } finally {
            db.release();
        }
    }


    // refreshToken
    static async refreshToken(token) {
        const { refreshToken } = token;  // Extraemos el refreshToken del cuerpo de la solicitud
        console.log('Refresh Token recibido:', refreshToken);  // Verifica que sea una cadena

        // Verificar si el refreshToken es una cadena de texto
        if (typeof refreshToken !== 'string') {
            throw new Error("El refresh token debe ser una cadena de texto.");
        }

        try {
            // Decodificar el refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            console.log("Token decodificado:", decoded); // Mostrar información del token

            // Buscar al usuario en la base de datos
            const usuarioDB = await pool.query(
                `SELECT id, refresh_token FROM usuarios WHERE id = $1`,
                [decoded.id]
            );

            if (usuarioDB.rows.length === 0) {
                throw new Error("No se encontró el usuario con ese id.");
            }

            // Verificar si el refresh token coincide con el de la base de datos
            if (usuarioDB.rows[0].refresh_token !== refreshToken) {
                throw new Error("Refresh token no válido o no coincide.");
            }

            // Generar un nuevo access token
            const accessToken = jwt.sign(
                { id: decoded.id, nombreUsuario: decoded.nombreUsuario },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRACION }
            );

            // Retornar el nuevo access token
            return { accessToken };

        } catch (error) {
            console.error("Error al refrescar el token:", error.message);
            throw new Error(error.message);  // Lanza el error para que el controlador lo maneje
        }
    }













}