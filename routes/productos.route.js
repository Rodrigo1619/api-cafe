import {Router} from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import { esAdminRol } from '../middlewares/validar-roles.js';
import { crearProducto } from '../controllers/productos.controller.js';


export const routerProducto = Router();

//obteniendo todas los productos


//obteniendo un producto pos id

//creando producto
routerProducto.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearProducto)

//actualizando prodcuto


//eliminando prodcuto