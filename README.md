# Paquetes instalados
* "bcryptjs"
* "cors"
* "dotenv"
* "express"
* "express-validator"
* "mongoose"
* jsonwebtoken
# No olvidar
Ahora se utiliza el import y no require, entonces para que esto agarrre debemos ir al package.json y 
escribir lo siguiente en el primer corchete
```
"type": "module",
```
Quedando nuestro package json inicial de la siguiente manera
```
{
  "name": "7-restserver",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
```

# configurar el .env
Se usara para el puerto 8080

# ¿Qué es middleware?
Los middlewares no son más que funciones que añadiran más funcionalidades a nuestro web server o en otras palabras es una función que siempre va a ejecutarse siempre que levantemos nuestro servidor

# Cors
Es lo que nos ayuda a proteger nuestro server de forma "superficial"

# Version anterior de los routes cuando estaban en server.js
```
//el app.get no existe, pero tenemos acceso al this.app.get 
        //debemos cambiar el ('/') porque el middleware ya lo esta usando
        this.app.get('/camaron', (req,res)=>{
            //res.send('Ola camaron sin cola'); cambiamos el send por json para no mandar un html sino un archivo en formato json se hace la peticion en postman con la url
            res.json({
                msg: 'get API'
            });
        });
        this.app.put('/camaron', (req,res)=>{  
            res.json({
                msg: 'put API'
            });
        });
        this.app.post('/camaron', (req,res)=>{
            res.json({
                msg: 'post API'
            });
        });
        this.app.delete('/camaron', (req,res)=>{
            res.json({
                msg: 'delete API'
            });
        });
        this.app.patch('/camaron', (req,res)=>{
            res.json({
                msg: 'patch API'
            });
        });
```

# Acciones en postman
Para hacer las "comunicaciones" con el post, se selecciona el endpoint en tipo POST, de ahi nos vamos a body y en body seleccionamos raw y elegimos JSON

# ¿Qué es mongoose?
Mongoose es una librería para Node.js que nos permite escribir consultas para una base de datos de MongooDB, con características como validaciones, construcción de queries, middlewares, conversión de tipos y algunas otras, que enriquecen la funcionalidad de la base de datos.

# Paquete para validar correos
npm i express-validator

# Crear roles mediante mondongo
* Ir a nuestra base de datos (DBCAFE)
* Crear nueva coleccion
* Para agregar los roles le damos en add data
Luego creamos un nuevo modelo y el archivo debe de llamarse como lo pusimos en la base de datos solo que en singular

# PUT
Para mandar un put en postman mediante la url es de la siguiente manera 
{{url}}/api/usuarios/12, teniendo ese numero como el id y la url se entiende que ya sea de desarrollo o produccion

# Posible error en el router del put
Se debe de mandar un ObjectId valido de mondongo, ya que si Si nuestro es id es 606e555cc3ce9207f50a2a95 y le agregamos una letra o numero nos lanza el cast error pero si cambiamos el 5 por una A nos va a lanzar el error que estamos programando o sea "El id no existe", razon? ño se

# Prueba para obtener usuario con el desde hasta con su limite
{{url}}/api/usuarios?desde=5&limite=10
esto se manda desde los parametros

# Get antes de usar el Promise.all
```
/* Forma anterior antes del Promise.all
    const usuarios = await Usuario.find(query)
    .skip(desde)
    .limit(limite) //asi no da error pero tambien si se trabaja en versiones anteriores se arregla con un .limit(Number(limite)) 
    const total = await Usuario.countDocuments(query)
    */
    res.json({
        //total,
        //usuarios
    });
```

# Agregar variables de entonrno a heroku 
A github no podemos subir nuestro .env porque ahi esta la cadena de conexccion de mondongo, entonces heroku necesita esas variables de entorno, y se hace con el siguiente comando 
´´´
heroku config set:nombreVariable="lo que debes ponerle"
´´´
Para ver nuestras variables de entorno de heroku es
´´´
heroku config
´´´

# Cambios en el nombre de los router
Debido a como se esta trabajando las importaciones del router, ya que no se puede usar requier, se opto por crear los nombres especificos para los router, usuarioRouter y authRouter

# Ver logs en heroku
* heroku logs -n 100 
Se entiende que ese 100 son los ultimos 100 logs
* heroku logs -n 100 --tail
Este es para que mantenga en vivo todos los logs, si hay uno nuevo lo mostrara en tiempo real, casi que como nodemon

# Configurar auth de google y obtener sus keys
Todos estos pasos es para generar nuestros IDs y configurar nuestro google cloud
* irse al siguiente link https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
* ir a la parte del setup
* ir a Google APIs console (https://console.cloud.google.com/apis/dashboard) e iniciar sesion
* ir a la parte de arriba donde despliega un menu para los proyectos y creamos uno nuevo si es necesario 
* si creamos proyecto llenamos los datos y damos en crear
* ir a la parte de credenciales 
* Ir a la parte del ID clientes OAuth2.0
* Ir a la parte de pantalla de consentimiento y trabajar de forma interno o externo y crear
* Llenar toda la informacion y dar en continuar
* Una vez lo de consentimiento hecho vamos a credenciales
* Crear credenciales - ID de cliente de OAuth
* Tipo de apliacion es app web y poner su nombre
* Origenes autorizados de Javascript: agregar siempre estas 2 (http://localhost - http://localhost:8080 )
* A la hora antes de subir la app a produccion tambien es necesario agregar ese link tanto en codigo como en los URIs de google (https://apicoffe.herokuapp.com)
* Al darle listo nos redigira al main menu y nos dara nuestros ID de google que agregaremos en nuestros .env
* Si queremos ver de nuevo nuestros ID solo entramos a nuestro OAuth 2.0 client IDs y ahi saldran 


# Hacer documentacion desde postman
* Dar en los 3 puntos de nuestra collecion de peticiones
* View documentation
* Dar al boton de publish

# Mandar el token 
Hacemos el login, y en la parte de headers mandamos el nombre x-token (asi le pusimos) y a la par el token y mandar la peticion