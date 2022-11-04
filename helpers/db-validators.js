import { Categoria, Usuario, Role } from '../models/index.model.js'

//validando si es un rol que ya esta establecido en la base de datos
const esRolValido = async(rol = '')=>{
    const existeRol = await Role.findOne({rol})
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}
//validando si el correo ya existe
const emailExiste = async(correo = '')=>{
    const emailExistente = await Usuario.findOne({correo}) //encuentra si un correo se repite de los que el usuario mande
    if(emailExistente){
        throw new Error(`El correo ${correo} ya ha sido tomado, intenta con otro`)
    }
}
//para ver si existe el usuario por el id
const existeUsuarioId = async(id)=>{
    const existeUsuario = await Usuario.findById(id)
    if(!existeUsuario){ //si el usuario esta en null o no existe 
        throw new Error(`El id ${id} no existe`)
    }
}
const existeCategoriaPorId = async(id)=>{
    const existeCategoria = await Categoria.findById(id)
    if(!existeCategoria){ //si el usuario esta en null o no existe 
        throw new Error(`El id ${id} para la categoria no existe`)
    }
}

export{
    esRolValido,
    emailExiste,
    existeUsuarioId,
    existeCategoriaPorId
}