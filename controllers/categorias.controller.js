import { request, response } from "express";
import {Categoria} from '../models/index.model.js'


//obtener ctegorias - paginado - total - populate 

//obtener cateegoria - populate {}

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
    crearCategoria
}