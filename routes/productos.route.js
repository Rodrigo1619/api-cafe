import {Router} from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import { esAdminRol } from '../middlewares/validar-roles.js';
import { obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto } from '../controllers/productos.controller.js';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/db-validators.js';

export const routerProducto = Router();

//obteniendo todas los productos
routerProducto.get('/', obtenerProductos)

//obteniendo un producto pos id
routerProducto.get('/:id',[
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)
//creando producto
routerProducto.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El producto no contiene un Id valido de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)

//actualizando prodcuto
routerProducto.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    //check('categoria', 'El prodcuto no contiene un Id valido de mongo').isMongoId(),
    validarCampos
],actualizarProducto)


//eliminando prodcuto
routerProducto.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es mongo id').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos

],borrarProducto)