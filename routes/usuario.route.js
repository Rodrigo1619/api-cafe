import {Router} from 'express';
import { check } from 'express-validator';
import { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } from '../controllers/usuarios.controller.js';
import { esRolValido, emailExiste, existeUsuarioId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { esAdminRol } from '../middlewares/validar-roles.js';


export const routerUsuario = Router();
 
        //debemos cambiar el ('/') porque el middleware ya lo esta usando osea se debe dejar vacio
        routerUsuario.get('/', usuariosGet );

        //si se mandan solo 2 argumentos se entiende que es ruta y controlador pero si se mandan 3 se entiende que el de en medio es el middleware y se manda como un arreglo
        //el check es para validar que sea y tenga la forma de un correo, para no estar haciendo el monton de expresiones regulares y tener mas limpio el codigo
        routerUsuario.post('/',[
                check('nombre', 'El nombre es obligatorio').not().isEmpty(), //que el nombre no este vacio
                check('contraseña', 'La contraseña debe ser mayor a 6 caracteres').isLength({ min: 6}),
                //check('correo', 'Correo invalido').isEmail(), //forma anterior       
                check('correo').custom(emailExiste),
                //check('rol', 'Este rol no existe').isIn(['ADMIN_ROL', 'USUARIO_ROL']),//ya no se hara de esta forma, lo validaremos desde la base de datos
                check('rol').custom(esRolValido),
                validarCampos //si este mw pasa, se ejecutara la funcion de post, de lo contrario no
        ],usuariosPost);

        routerUsuario.put('/:id',[
                check('id', 'No es un ID válido').isMongoId(),
                check('id').custom(existeUsuarioId),
                check('rol').custom(esRolValido), //para que nos mande un rol valido de la base de datos
                validarCampos //siempre se debe de poner para evitar los errores
        ], usuariosPut);

        routerUsuario.patch('/', usuariosPatch);
        
        routerUsuario.delete('/:id',[
                validarJWT,
                esAdminRol,
                check('id', 'No es un ID válido').isMongoId(),
                check('id').custom(existeUsuarioId),
                validarCampos
        ] ,usuariosDelete);
