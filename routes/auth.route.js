import {Router} from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerAuth = Router();

routerAuth.post('/login',[
    check('correo','correo obligatorio').isEmail(),
    check('contraseña','contraseña obligatoria').not().isEmpty(), //que la contraseña no este vacia
    validarCampos
], login );