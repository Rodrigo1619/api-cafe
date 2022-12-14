import {Router} from 'express';
import { check } from 'express-validator';
import { actualizarImagen, actualizarImagenCloudinary, cargarArchivo, mostrarImagen } from '../controllers/uploads.controller.js';
import { coleccionesPermitidas } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarArchivoSubir} from '../middlewares/validar-archivo.js'


export const routerUpload = Router();

routerUpload.post('/', validarArchivoSubir,cargarArchivo)

routerUpload.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(colecc => coleccionesPermitidas(colecc, ['usuarios', 'productos'])),//si queremos mas colecciones a permitir solo se las agregamos
    validarCampos
], actualizarImagenCloudinary) 
//antes de usar cloudinary se usaba actualizarImagen, se ha dejado el codigo con fines de estudio

routerUpload.get('/:coleccion/:id',[
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(colecc => coleccionesPermitidas(colecc, ['usuarios', 'productos'])),//si queremos mas colecciones a permitir solo se las agregamos
    validarCampos
], mostrarImagen)
