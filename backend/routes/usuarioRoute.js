import express from 'express';
import {UsuarioController} from "../controllers/usuarioControllers.js";
import {autenticacionToken} from "../middlewares/autenticacionToken.js";

const usuarioRoute = express.Router();

usuarioRoute.get('/usuarios',autenticacionToken, UsuarioController.getUsuarios);
usuarioRoute.get('/usuarios/:id', UsuarioController.getUsuario);
usuarioRoute.post('/usuarios',  UsuarioController.insertUsuario);
usuarioRoute.put('/usuario/:id',  UsuarioController.putControllerUsuario);

usuarioRoute.get('/perfil', autenticacionToken, (req, res) => {
    const userId = req.user.id; // mostrado el  id del usuario autenticado
    // con esto podemos utilizar el  'userId' para realizar operaciones de nuestro sistema
    res.json({ id: userId})
});

usuarioRoute.get('/favoritos/:id', UsuarioController.getControllerFavoritos)
usuarioRoute.post('/favoritos', UsuarioController.postControllerFavoritos)
usuarioRoute.delete('/favoritos/:id', UsuarioController.deleteControllerFavoritos)

export default usuarioRoute;

// {
//     "nombreUsuario": "bcarrielr",
//     "correo": "brignerarielc@email.com",
//     "contrasena": "brignercr10",
//     "telefono": "0962165367",
//     "direccion": "Vinces - Palizada"
// }
