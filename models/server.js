import express from 'express';
import cors from 'cors';
import {routerUsuario} from '../routes/usuario.route.js'
import { routerAuth } from '../routes/auth.route.js';
import { DBConnection } from '../database/config.js';
//clase para poder que nuestra app de express este trabajando en una carpeta diferende del app.js
class Server{
    constructor(){
        //delcarando las variables
        this.app = express();
        this.port = process.env.PORT;

        //paths recomendacion: ordenarlo alfabeticamente
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

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
    }
    //creamos el metodo para las rutas
    routes(){
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.usuariosPath, routerUsuario)
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
    
}

export default Server;