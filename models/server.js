import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { DBConnection } from '../database/config.js';
import { 
    routerAuth, routerBuscar, routerCategoria, 
    routerProducto, routerUsuario, routerUpload } 
from '../routes/index.route.js';

//clase para poder que nuestra app de express este trabajando en una carpeta diferende del app.js
class Server{
    constructor(){
        //delcarando las variables
        this.app = express();
        this.port = process.env.PORT;

        //paths recomendacion: ordenarlo alfabeticamente
        this.paths = {
            auth:'/api/auth',
            buscar:'/api/buscar',
            categorias:'/api/categorias',
            productos:'/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        }

        //Conectando a la base de datos
        this.connectDB();

        //Middelwares
        this.middlewares();
        //Rutas
        //mandamos a llamar el metodo de routes
        this.routes();
    }

    //-------------------------------------METODOS-------------------------------------
    //Creando metodo para la DB, el metodo debe ser asincrono
    async connectDB(){
        await DBConnection();
    }
    //creando nuestros middlewares
    middlewares(){
        //use es para saber que es un middleware y el express.static es para decir que carpeta estatica
        //usar, en este caso sera la carpeta public, recordar que al hacer esto se hace con la ruta raiz('/')
        this.app.use(express.static('public'));

        //Cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json())

        //Carga de archivos
        //ojo: el createParentPath por defecto es false, esto crea un nuevo directorio si asi nosotros queremos
        //pero si no sabemos exactamente donde estamos guardando la informacion puede lelgar a darnos problemas
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    //creamos el metodo para las rutas
    routes(){
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.buscar, routerBuscar);
        this.app.use(this.paths.categorias, routerCategoria);
        this.app.use(this.paths.productos, routerProducto);
        this.app.use(this.paths.usuarios, routerUsuario);
        this.app.use(this.paths.uploads, routerUpload);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
    
}

export default Server;