import express from 'express';
import {UsuarioController} from "../controllers/usuarioControllers.js";
import {autenticacionToken} from "../middlewares/autenticacionToken.js";

const usuarioRoute = express.Router();

usuarioRoute.get('/usuarios',autenticacionToken, UsuarioController.getUsuarios);
usuarioRoute.get('/usuarios/:id',autenticacionToken, UsuarioController.getUsuario);
usuarioRoute.post('/usuarios',  UsuarioController.insertUsuario);

usuarioRoute.get('/perfil', autenticacionToken, (req, res) => {
    const userId = req.user.id; // mostrado el  id del usuario autenticado
    // con esto podemos utilizar el  'userId' para realizar operaciones de nuestro sistema
    res.json({ id: userId})
});

export default usuarioRoute;
