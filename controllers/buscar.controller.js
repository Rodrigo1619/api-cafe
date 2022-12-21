import { request, response } from "express";
import { isValidObjectId, ObjectId } from "mongoose";
import { Usuario, Categoria, Producto } from "../models/index.model.js";
const coleccionesPermitidas = [
    'categoria',
    'producto',
    'usuario',
    'roles'
]
const buscarUsuarios = async(termino='', res = response)=>{
    const esMongoID = isValidObjectId(termino) //devuelve un true
    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        res.json({
            results: (usuario) ? [usuario] : [] //si usuario existe, mandar el arreglo con infor. sino mandar arreglo vacio
        })
    }

    //expresion regular para hacer busqueda insensibles para encontrar nombres coincidentes
    const regex = RegExp(termino, 'i') //'i' es lo de insensible a mayusculas y minusculas
    //buscar por nombre de usuario
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}], //que el nombre o correo concuerden con la expresion regular 
        $and: [{estado:true}]
    }) 
    res.json({
        results: usuarios
    })
}
const buscarCategorias = async(termino = '', res = response)=>{
    const esMongoID = isValidObjectId(termino)
    if(esMongoID){
        const categoria = await Categoria.findById(termino)
        res.json({
            results: (categoria) ? [categoria] : []
        })
    }
    //expresion regular para hacer busqueda insensibles para encontrar nombres coincidentes
    const regex = RegExp(termino, 'i') //'i' es lo de insensible a mayusculas y minusculas
    //buscar por nombre de usuario
    const categorias = await Categoria.find({nombre:regex, estado:true}) 
    res.json({
        results: categorias
    })
}
const buscarProductos = async(termino = '', res = response)=>{
    const esMongoID = isValidObjectId(termino)
    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria', 'nombre') //mostrar el nombre de la categoria y no solo id
        res.json({
            results: (producto) ? [producto] : []
        })
    }
    //expresion regular para hacer busqueda insensibles para encontrar nombres coincidentes
    const regex = RegExp(termino, 'i') //'i' es lo de insensible a mayusculas y minusculas
    //buscar por nombre de usuario
    const productos = await Producto.find({nombre:regex, estado:true}).populate('categoria', 'nombre')//mostrar nombre de categoria y no solo id
    res.json({
        results: productos
    })
}

const buscar = (req=request, res=response)=>{
    const {coleccion, termino} = req.params //es lo que mandaremos a los parametros de la consulta

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'categoria':
            buscarCategorias(termino, res)
        break;

        case 'producto':
            buscarProductos(termino, res)
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