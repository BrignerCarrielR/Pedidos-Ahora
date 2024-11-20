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
            const data = await UsuarioModel.createUsuario(req.body);
            res.status(200).send(data);
        } catch (error) {
            res.status(500).send({
                message: error.message || "Error al insertar el usuario"
            });
        }
    }


}


