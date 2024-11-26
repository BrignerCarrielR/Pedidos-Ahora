import {UsuarioModel} from "../models/usuarioModel.js";


export class UsuarioController {
    // obtener el listado
    static async getUsuarios(req, res) {
        try {
            const data = await UsuarioModel.getUsuarios();
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener los usuarios"
            });
        }
    }
    // obtener un usuario en particular
    static async getUsuario(req, res) {
        try{
            const data = await UsuarioModel.getUsuario(req.params.id);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al obtener el usuario"
            });
        }
    }
    // insertar un nuevo usuario
    static async insertUsuario(req, res) {
        try {
            const{nombreUsuario, correo, contrasena, telefono, direccion}=req.body;
            // validamos nombreUsuario: debe ser una cadena no vacia
            if (typeof nombreUsuario !== "string" || nombreUsuario.trim() === "") {
                return res.status(400).send({ message: "El nombre de usuario no es válido" });
            }
            // validamos correo: debe ser un correo valido
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                return res.status(400).send({ message: "El correo electrónico no es válido" });
            }
            // validamos contraseña: debe tener entre 8 y 16 caracteres
            if (contrasena.length < 8 || contrasena.length > 16) {
                return res.status(400).send({ message: "La contraseña debe tener entre 8 y 16 caracteres" });
            }
            // validamos el teléfono: debe ser una cadena numérica de 10 dígitos
            if (telefono.length !== 10 || !/^\d{10}$/.test(telefono)) {
                return res.status(400).send({ message: "El teléfono debe tener 10 caracteres numéricos" });
            }
            // validamos la  dirección: no puede estar vacía
            if (typeof direccion !== "string" || direccion.trim() === "") {
                return res.status(400).send({ message: "La dirección no es válida" });
            }

            const data = await UsuarioModel.createUsuario(req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al insertar el usuario"
            });
        }
    }


}


