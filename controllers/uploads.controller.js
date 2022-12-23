import { request, response } from "express";
import { subirArchivo } from "../helpers/subir-archivo.js";


const cargarArchivo = async(req=request, res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0|| !req.files.archivo) { //TODO: investigar Object.keys

        res.status(400).json({msg: 'No hay archivos para subir'});
        return;
    }
    //por defecto las extensiones por defecto son solo imagenes
    const nombreArchivo = await subirArchivo(req.files)

    res.json({nombre: nombreArchivo})

    
}

export{
    cargarArchivo
}