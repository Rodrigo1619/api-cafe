import {request,response} from 'express';
import bcryptjs from 'bcryptjs';
import Usuario from '../models/usuario.model.js';

const usuariosGet = async(req=request,res = response)=>{
    
    const {limite = 5, desde = 0} = req.query //por defecto mandaremos 5 usuarios
    const query = {estado: true}
    //se hace uso de desestructuracion de arreglos no de objetos
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(desde)
            .limit(limite) //asi no da error pero tambien si se trabaja en versiones anteriores se arregla con un .limit(Number(limite)) 
    ])
    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async(req,res = response)=>{

    
    const {nombre, correo, contraseña, rol} = req.body
    const usuario = new Usuario({nombre, correo, contraseña, rol}); //instanciamos un nuevo usuario
    
    //encriptando contraseña
    const salt = bcryptjs.genSaltSync(); //es cuantas vueltas le queremos dar a la contraseña para que sea dificil descencriptarla, por defecto esta en 10
    usuario.contraseña = bcryptjs.hashSync(contraseña, salt) //nos pide la contraseña y el numero de saltos

    //esto hace que se guarde en la base de datos de mondongo
    await usuario.save(); 

    res.json({
        //msg: 'post API - controller',
        usuario
    });
}
const usuariosPut = async(req,res=response)=>{  
    const {id} = req.params;
    const {_id, contraseña, google,correo, ...restoInfo} = req.body; //extrayendo la info que no queremos que vea el usuario

    //validar contra la base de datos
    if(contraseña){ 
        //encriptando contraseña
        const salt = bcryptjs.genSaltSync(); //es cuantas vueltas le queremos dar a la contraseña para que sea dificil descencriptarla, por defecto esta en 10
        restoInfo.contraseña = bcryptjs.hashSync(contraseña, salt) //nos pide la contraseña y el numero de saltos
    }
    const usuario = await Usuario.findByIdAndUpdate(id, restoInfo) //el resto de info. es lo que se actualizara
    res.json(usuario);
}

const usuariosPatch = (req,res = response)=>{
    res.json({
        msg: 'patch API'
    });
}
const usuariosDelete = async(req,res=response)=>{
    const {id} = req.params

    //const uid = req.uid //id del usuario que esta haciendo la accion de borrar al otro usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    //const usuarioAutenticado =  req.usuario //extrayendo la informacion del usuario
    res.json(usuario); //se manda a llamar ({usuario, usuarioAutenticado})
}


export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}