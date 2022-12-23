import { request, response } from "express";


const cargarArchivo = (req=request, res=response)=>{

    res.json({
        msg: 'ola'
    })

}

export{
    cargarArchivo
}