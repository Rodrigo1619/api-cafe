import {Schema, model} from "mongoose";

const CategoriaSchema = Schema({
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
    }
})

export default model('Categoria', CategoriaSchema);