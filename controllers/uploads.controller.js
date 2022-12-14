import path from 'path';
import fs from 'fs';
import { request, response } from "express";
import { Usuario, Producto } from "../models/index.model.js";
import { subirArchivo } from "../helpers/subir-archivo.js";
import {v2 as cloudinary} from 'cloudinary'

//autenticando a cloudinary
cloudinary.config(process.env.CLOUDINARY_URL)

//para no recibir error de __dirname is not defined
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const cargarArchivo = async(req=request, res=response)=>{

    try {
            //por defecto las extensiones por defecto son solo imagenes
    //const nombreArchivo = await subirArchivo(req.files, ['txt', 'md'], 'textos')
    const nombreArchivo = await subirArchivo(req.files, undefined, 'imgs') //dejar undefined para traer extensiones por defecto

    res.json({nombre: nombreArchivo})
    } catch (msg) {
        res.status(400).json({msg})
    }
    
}

const actualizarImagen = async(req=request, res=response)=>{

    //trayendo la informacion que necesitamos de los parametros (request)
    const {id, coleccion} = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Al backend se le olvido validar esto, contactelo'})
    }

    //Limpiar imagenes previas
    if(modelo.img){
        //borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){//si devuelve el true borrara la imagen
            fs.unlinkSync(pathImagen)
        }
    }

    //se deja coleccion sin el '' debido a que hoy se haran las carpetas automaticas desde el nombre de la coleccion
    const nombreArchivo = await subirArchivo(req.files, undefined, coleccion) //dejar undefined para traer extensiones por defecto
    modelo.img = nombreArchivo

    await modelo.save()


    res.json(modelo)
}

const actualizarImagenCloudinary = async(req=request, res=response)=>{

    //trayendo la informacion que necesitamos de los parametros (request)
    const {id, coleccion} = req.params
    let modelo //let para que pueda cambiar entre producto y usuario

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Al backend se le olvido validar esto, contactelo'})
    }

    //Limpiar imagenes previas
    if(modelo.img){
        const nombreArr = modelo.img.split('/')
        const nombre = nombreArr[nombreArr.length - 1]
        const [public_id] = nombre.split('.')
        cloudinary.uploader.destroy(public_id )
    }
    const {tempFilePath} = req.files.archivo //esto viene de los request
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath)//es una promesa y desestructuramos el secure_url que es lo que nos interesa

    modelo.img = secure_url //el modelo con su propiedad de img debe ser ese secure_url

    await modelo.save()

    res.json(modelo)
}

const mostrarImagen = async(req=request, res=response)=>{
    
    //trayendo la informacion que necesitamos de los parametros (request)
    const {id, coleccion} = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if(!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({msg:'Al backend se le olvido validar esto, contactelo'})
    }

    //Mostrando las imagenes 
    if(modelo.img){
        //mostrar la imagen de la peticion
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){//si devuelve el true mostrara la imagen
            return res.sendFile(pathImagen)
        }
    }
    const noImgPath = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(noImgPath)
}

export{
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}