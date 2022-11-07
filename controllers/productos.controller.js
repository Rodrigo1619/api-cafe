import {request, response} from 'express'
import { Producto } from '../models/index.model.js'

//obtener prodructo
const obtenerProductos = async(req=request, res=response)=>{
    const {limite = 5, desde = 0} = req.query //por defecto mandaremos 5 productos
    const query = {estado: true}
    //se hace uso de desestructuracion de arreglos no de objetos
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre') //el usuario
            .populate('categoria', 'nombre') //el nombre de la categoria
            .skip(desde)
            .limit(limite)
    ])
    res.json({
        total,
        productos
    });
}

//obtener producto
const obtenerProducto = async(req=request, res=response)=>{
    const {id} = req.params
    const producto = await Producto.findById(id)
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre')

    res.json({
        producto
    })
}

//crear prodcuto
const crearProducto = async(req=request, res=response)=>{
    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase()});

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

}
//actualizar producto
const actualizarProducto = async(req=request, res=response)=>{
    const {id} = req.params
    const {estado, usuario, ...data } = req.body

    //vemos si el nombre viene en la data
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase()
    }
    data.usuario = req.usuario._id

    const producto = await Producto.findByIdAndUpdate(id, data, {new:true}) //new:true solamente muestra la informacion actualizada del nuevo doc en la respuesta
    res.json({
        msg:'Producto actualizado',
        producto
    })
}
//eliminar prodructo
const borrarProducto = async(req=request, res=response)=>{
    const {id} = req.params
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})

    res.json({
        msg:'Producto eliminado',
        productoBorrado
    })
}
export{
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}