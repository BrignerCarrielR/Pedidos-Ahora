import express from 'express';
import {LoginController} from "../controllers/loginControllers.js";

const loginRouter = express.Router();

loginRouter.post('/login', LoginController.login);
loginRouter.post('/refresh_token', LoginController.refresh);

export default loginRouter;