import jwt from 'jsonwebtoken';

// en esta middleware de autenticaciion verifica que si la solicitud contiene el token valido,
// si es valido permite que la solicitud continue, si el token no esta o no es valido, responde con un error
export function autenticacionToken(req, res, next) { // next se usa para pasar al url en caso sea valido
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acceso requerido.' });
    }

    try {
        const infoUsuario = jwt.verify(token, process.env.JWT_SECRET); //"payload" (carga útil)
        req.user = infoUsuario; // Guardamos el payload del token en req.user
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: 'Token no válido o expirado.' });
    }
}

