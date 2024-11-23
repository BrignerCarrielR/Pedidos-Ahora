import express from 'express';
import cors from 'cors';
import usuarioRoute from "./routes/usuarioRoute.js";
import menuComidaRoute from "./routes/menuComidaRoute.js";
import pedidosRouter from "./routes/pedidoRoute.js";
import carritoRouter from "./routes/carritoRoute.js";
import loginRouter from "./routes/loginRoute.js";
import temporadaRoutes from "./routes/temporadaRoute.js";

const app = express();
app.use(cors({
    origin: 'http://localhost:4200',  // permite solicitudes desde este dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // metodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // encabezados permitidos
}));
app.use(express.json());

// rutas del usuario
app.use(usuarioRoute);
app.use(menuComidaRoute)
app.use(pedidosRouter)
app.use(carritoRouter)
app.use(loginRouter)
app.use(temporadaRoutes)


app.get('/', (req, res) => {
    res.send('<h1>Proyecto en PostgreSQL, NodeJS y AngularCLI</h1>');
})

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
})