import {request, response} from 'express'
import { Producto } from '../models/index.model.js'

//obtener prodructo


//obtener producto


//crear prodcuto
const crearProducto = async(req=request, res=response)=>{
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre})

    //si el prodcuto existe
    if(productoDB){
        res.status(400).json({
            msg:`El producto ${productoDB} ya existe en la base de datos`
        })
    }
    //generando data a guardar
    const data={
        nombre,
        usuario: req.usuario._id,
        //categoria: req.categoria._id
    }

    //instanciando producto
    const producto = new Producto(data)

    //guardamos prodcuto en la db
    await producto.save()

    //mandamos la respuesta
    res.status(200).json({producto})
}
//actualizar producto

//eliminar prodructo

export{
    crearProducto
}