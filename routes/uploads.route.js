import {Router} from 'express';
import { check } from 'express-validator';
import { actualizarImagen, cargarArchivo } from '../controllers/uploads.controller.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';


export const routerUpload = Router();

routerUpload.post('/', cargarArchivo)
routerUpload.put('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(colecc => coleccionesPermitidas(colecc, ['usuarios', 'productos'])),//si queremos mas colecciones a permitir solo se las agregamos
    validarCampos
], actualizarImagen)
