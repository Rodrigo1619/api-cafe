import {Router} from 'express';
import { check } from 'express-validator';
import { crearCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.controller.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';

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
routerCategoria.put('/:id', (req, res)=>{
    res.json('put')
})


//borrar categoria - solo el admin puede
routerCategoria.delete('/:id', (req, res)=>{
    res.json('delete')
})