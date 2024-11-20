import {LoginModel} from "../models/loginModel.js";

export class LoginController {
    // controlador para el login
    static async login(req, res) {
        try {
            const data = await LoginModel.login(req.body);
            res.status(200).send(data)
        } catch (error){
            res.status(400).send({error: error.message});
        }
    }

    // contralador para refrezcar el token
    static async refresh(req, res) {
        try {
            // Llamamos a refreshToken con el cuerpo de la solicitud, que contiene el refreshToken
            const data = await LoginModel.refreshToken(req.body);
            res.status(200).json(data);  // Enviamos el nuevo accessToken como respuesta JSON

        } catch (error) {
            console.error("Error al refrescar el token:", error.message);
            res.status(400).json({ error: error.message });  // Si ocurre un error, enviamos el mensaje de error
        }
    }



}