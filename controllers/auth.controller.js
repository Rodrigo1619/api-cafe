import { json, request, response } from "express"
import Usuario from '../models/usuario.model.js'
import bcryptjs from 'bcryptjs'
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";
import { DefaultTransporter } from "google-auth-library";

const login = async(req, res=response)=>{

    const {correo, contraseña} = req.body;

    try {
        //verificando que el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:'correo no es correcto '
            })
        }

        //si el usuario esta activo en la base de datos
        if(!usuario.estado){ //de otra manera: usuario.estado === false
            return res.status(400).json({
                msg:'Usuario inexistente- estado:false'
            })
        }

        //verificando contraseña
        //compara que la contraseña que estamos recibiendo del parametro del req.body sea la misma que tiene el usuario
        const contraseñaValida = bcryptjs.compareSync(contraseña, usuario.contraseña)
        if(!contraseñaValida){
            return res.status(400).json({
                msg:'contraseña no es correcta'
            })
        }


        //generando el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

const googleSignIn = async(req=request, res=response)=>{

    const {id_token} = req.body;

    try {

        const {nombre, correo, img} = await googleVerify(id_token)
        
        //generar referencia para ver si el correo ya existe en la base de datos
        let usuario = await Usuario.findOne({correo})

        if(!usuario){
            const data = { //data del usuario
                nombre, 
                correo,
                contraseña: ':P',
                img,
                google: true,
                rol //se debe agregar rol porque es campo obligatorio
            }

            //creamos el usuario si no existe
            usuario = new Usuario(data)
            usuario.save()
        }

        //Si el usuario tiene estado falso de google
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el admin porque el usuario ha sido bloqueado'
            })
        }

        //generando el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })
        
    }catch(error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Ni modo el token no se pudo verificar'
        })
    }

}

export{
    login,
    googleSignIn
}