import { request, response } from "express";

const coleccionesPermitidas = [
    'categoria',
    'producto',
    'usuario',
    'roles'
]
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

        break;

        default: 
            res.status(500).json({
                msg: 'Al backend se le ha olvidado implementar esta busqueda'
        })
    }


    res.json({
        coleccion, termino
    })
}

export{
    buscar
}