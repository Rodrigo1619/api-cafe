import { request, response } from "express";
import { Usuario, Producto } from "../models/index.model.js";
import { subirArchivo } from "../helpers/subir-archivo.js";


const cargarArchivo = async(req=request, res=response)=>{

    try {
            //por defecto las extensiones por defecto son solo imagenes
    //const nombreArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos')
    const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs') //dejar undefined para traer extensiones por defecto

    res.json({nombre: nombreArchivo})
    } catch (msg) {
        res.status(400).json({msg})
    }
    
}

const actualizarImagen = async(req=request, res=response)=>{

    //trayendo la informacion que necesitamos de los parametros (request)
    const {id, coleccion} = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Al backend se le olvido validar esto, contactelo'})
    }

    //se deja coleccion sin el '' debido a que hoy se haran las carpetas automaticas desde el nombre de la coleccion
    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion) //dejar undefined para traer extensiones por defecto
    modelo.img = nombreArchivo

    await modelo.save()


    res.json(modelo)
}

export{
    cargarArchivo,
    actualizarImagen
}