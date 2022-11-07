import {Router} from 'express';
import { buscar } from '../controllers/buscar.controller.js';

export const routerBuscar = Router()

routerBuscar.get('/:coleccion/:termino',buscar)

