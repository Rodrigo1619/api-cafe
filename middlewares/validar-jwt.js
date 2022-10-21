import { response, request } from 'express';
import jwt from 'jsonwebtoken';

const validarJWT = (req = request, res=response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token mi rey'
        })
    }
    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        req.uid = uid;

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