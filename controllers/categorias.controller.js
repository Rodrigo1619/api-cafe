import { request, response } from "express";
import {Categoria} from '../models/index.model.js'


//obtener ctegorias - paginado - total - populate 
const obtenerCategorias = async(req=request, res=response)=>{
    const {limite = 5, desde = 0} = req.query //por defecto mandaremos 5 categorias
    const query = {estado: true}
    //se hace uso de desestructuracion de arreglos no de objetos
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(desde)
            .limit(limite) //asi no da error pero tambien si se trabaja en versiones anteriores se arregla con un .limit(Number(limite)) 
    ])
    res.json({
        total,
        categorias
    });
}
//obtener cateegoria - populate {}
const obtenerCategoria = async(req=request, res=response)=>{
    const {id} = req.params
    const categoria = await Categoria.findById(id)
                            .populate('usuario', 'nombre')

    res.json({
        categoria
    })
}

const crearCategoria = async(req = request, res=response )=>{
    //extrayendo el nombre desde el body de la peticion y convirtiendola a mayuscula
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    //si existe
    if(categoriaDB){
        res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre}, ya existe`
        })
    }
    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    //instanciamos la categoria
    const categoria = new Categoria(data)

    //guardamos en la db
    await categoria.save()

    //mandamos la respuesta
    res.status(201).json({categoria})
}
//actualizar categoria 

//borrar categoria - estado :false
export{
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria
}