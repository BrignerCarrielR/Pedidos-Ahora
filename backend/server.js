import express from 'express';
import cors from 'cors';
import usuarioRoute from "./routes/usuarioRoute.js";
import menuComidaRoute from "./routes/menuComidaRoute.js";
import pedidosRouter from "./routes/pedidoRoute.js";
import carritoRouter from "./routes/carritoRoute.js";
import loginRouter from "./routes/loginRoute.js";
import temporadaRoutes from "./routes/temporadaRoute.js";

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:4200',  // Permite solicitudes desde este dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Encabezados permitidos
}));

// Configurar el tamaño máximo del cuerpo de la solicitud
app.use(express.json({ limit: '10mb' }));  // Aplica un límite de 100 MB para el cuerpo de la solicitud
app.use(express.urlencoded({ limit: '10mb', extended: true }));  // También configura el límite para formularios codificados en URL

// Rutas del proyecto
app.use(usuarioRoute);
app.use(menuComidaRoute);
app.use(pedidosRouter);
app.use(carritoRouter);
app.use(loginRouter);
app.use(temporadaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('<h1>Proyecto en PostgreSQL, NodeJS y AngularCLI</h1>');
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});
