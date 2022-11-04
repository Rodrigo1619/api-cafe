import {Router} from 'express';
import { check } from 'express-validator';
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.controller.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';
import { esAdminRol } from '../middlewares/validar-roles.js';

export const routerCategoria = Router();

//obteniendo todas las categorias - publico
routerCategoria.get('/',obtenerCategorias)


//obteniendo una categoria por id - publico
routerCategoria.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)


//creando categoria - privado, cualquiera con un token valido
routerCategoria.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria)


//actualizar categoria - privado, cualquiera con token valido
routerCategoria.put('/:id', [
    validarJWT,
    check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)


//borrar categoria - solo el admin puede
routerCategoria.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es mongo id').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos

],borrarCategoria)