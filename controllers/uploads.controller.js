import { request, response } from "express";
import path from 'path'
//para no recibir error de __dirname is not defined
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cargarArchivo = (req=request, res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0|| !req.files.archivo) { //TODO: investigar Object.keys

        res.status(400).json({msg: 'No hay archivos para subir'});
        return;
    }


    const {archivo} = req.files;
    const nombreCortado = archivo.name.split('.')
    const extension = nombreCortado[nombreCortado.length - 1] //tomando la ultima posicion seria la extension

    //validando extensiones que vamos a permitir
    const extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif']
    if(!extensionesPermitidas.includes(extension)){
        return res.status(400).json({
            msg: `La extension ${extension} no es valida, solamente se aceptan: ${extensionesPermitidas}`
        })
    }
res.json({
    extension
})

/*     const uploadPath = path.join(__dirname, '../uploads/', archivo.name); //crear directorio de uploads en la raiz de servidor
                        //archivo.name: name es lo que leemos de como se llama nuestro archivo a subir (se vio en la consola)
    archivo.mv(uploadPath, (err)=> {
        if (err) {
        return res.status(500).json({err});
    }
    
    res.json({msg:'File uploaded to ' + uploadPath});
    }); */
}

export{
    cargarArchivo
}