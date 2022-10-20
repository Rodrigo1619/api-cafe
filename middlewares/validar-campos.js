import { validationResult } from 'express-validator';

const validarCampos = (req,res, next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next(); //si el proceso llega a este punto, la funcion next hace que siga con el siguiente middleware en dado caso hayan mas
}

export{
    validarCampos
}