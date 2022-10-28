import {Router} from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';

export const routerCategoria = Router();

//obteniendo todas las categorias - publico
routerCategoria.get('/', (req, res)=>{
    res.json('get')
})
//obteniendo una categoria por id - publico
routerCategoria.get('/:id', (req, res)=>{
    res.json('get - id')
})
//creando categoria - privado, cualquiera con un token valido
routerCategoria.post('/', (req, res)=>{
    res.json('post')
})
//actualizar categoria - privado, cualquiera con token valido
routerCategoria.put('/:id', (req, res)=>{
    res.json('put')
})
//borrar categoria - solo el admin puede
routerCategoria.delete('/:id', (req, res)=>{
    res.json('delete')
})