import { request, response } from "express"

const validarArchivoSubir = (req=request, res=response, next)=>{
    if (!req.files || Object.keys(req.files).length === 0|| !req.files.archivo) { //TODO: investigar Object.keys
        return res.status(400).json({
            msg: 'No hay archivos para subir'
        });
    }
    next()
}

export{
    validarArchivoSubir
}