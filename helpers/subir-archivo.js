import path from 'path'
import { v4 as uuidv4 } from 'uuid';

//para no recibir error de __dirname is not defined
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const subirArchivo = (files, extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta='')=>{ 
    //trabajar mediante promesa para ver que sale bien y que sale mal
    return new Promise((resolve, reject)=>{
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1] //tomando la ultima posicion seria la extension
    
        //validando extensiones que vamos a permitir
        if(!extensionesPermitidas.includes(extension)){
            return reject(`La extension ${extension} no es valida, solamente se aceptan: ${extensionesPermitidas}`)
        }
    
        const nombreTemp = uuidv4() + '.' + extension //numerosUUID.extension
    
        const uploadPath = path.join(__dirname, '../uploads/',carpeta, nombreTemp); //crear directorio de uploads en la raiz de servidor
                            //archivo.name: name es lo que leemos de como se llama nuestro archivo a subir (se vio en la consola)
        archivo.mv(uploadPath, (err)=> {
            if (err) {
            reject(err)
        }
        
        resolve(nombreTemp)
        });
    })


    
}

export{
    subirArchivo
}