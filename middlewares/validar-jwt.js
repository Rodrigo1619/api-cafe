import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.model.js';


const validarJWT = async(req = request, res=response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token mi rey'
        })
    }
    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Usuario no existe en la DB'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario inexistente, estado: false'
            })
        }
        
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

export{
    validarJWT
}