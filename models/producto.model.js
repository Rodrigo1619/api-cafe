import {Schema, model} from "mongoose";

const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio a'],
        unique: true //para que no se cree en la DB aunque ya exista
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{//saber que usuario hizo la categoria
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio:{
        type: Number,
        default: 0
    },
    categoria:{ //a que categoria pertenece
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        //required: true
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    }
    
})
//quitarnos el __v
ProductoSchema.methods.toJSON = function(){ //cuando se ejcute el toJSON se ejecutara la funcion
    const {__v,estado,...data} = this.toObject();
    return data
}

export default model('Producto', ProductoSchema);