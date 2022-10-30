import {Router} from 'express';
import { check } from 'express-validator';
import { crearCategoria } from '../controllers/categorias.controller.js';
import { existeCategoria } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';

export const routerCategoria = Router();

//obteniendo todas las categorias - publico
routerCategoria.get('/', (req, res)=>{
    res.json('get')
})
//obteniendo una categoria por id - publico
routerCategoria.get('/:id', [
    check('id').custom(existeCategoria) //todo
],(req, res)=>{
    res.json('get - id')
})
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