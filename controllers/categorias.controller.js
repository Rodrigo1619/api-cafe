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
const actualizarCategoria = async(req=request, res=response)=>{
    const {id} = req.params
    const {estado, usuario, ...data } = req.body
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true}) //new:true solamente muestra la informacion actualizada del nuevo doc en la respuesta
    res.json({
        msg:'Categoria actualizada',
        categoria
    })
}


//borrar categoria - estado :false
const borrarCategoria = async(req=request, res=response)=>{
    const {id} = req.params
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json({
        msg:'Categoria eliminada',
        categoriaBorrada
    })
}


export{
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}