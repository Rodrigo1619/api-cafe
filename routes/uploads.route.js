import {Router} from 'express';
import { check } from 'express-validator';
import { cargarArchivo } from '../controllers/uploads.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';


export const routerUpload = Router();

routerUpload.post('/', cargarArchivo)
