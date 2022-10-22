import { request, response } from "express"


const esAdminRol = (req=request, res=response, next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin haber verificado el token'
        })
    }
    const {rol, nombre} = req.usuario;
    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no es administrador- no posee los permisos para esta acción`
        })
    }

    next();
}

export{
    esAdminRol
}