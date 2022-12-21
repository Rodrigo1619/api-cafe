import { request, response } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import { Usuario } from "../models/index.model.js";
const coleccionesPermitidas = [
    'categoria',
    'producto',
    'usuario',
    'roles'
]
const buscarUsuarios = async(termino='', res = response)=>{
    const esMongoID = isValidObjectId(termino)
    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        res.json({
            results: (usuario) ? [usuario] : [] //si usuario existe, mandar el arreglo con infor. sino mandar arreglo vacio
        })
    }
}

const buscar = (req=request, res=response)=>{
    const {coleccion, termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'categoria':

        break;

        case 'producto':

        break;

        case 'usuario':
            buscarUsuarios(termino, res)

        break;

        default: 
            res.status(500).json({
                msg: 'Al backend se le ha olvidado implementar esta busqueda. Contactelo  '
        })
    }


}

export{
    buscar
}