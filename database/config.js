import mongoose from 'mongoose';

const DBConnection = async()=>{
    //validando si la base de datos esta conectada
    try{
        await mongoose.connect(process.env.MONGODB_CNN, {
            //objetos que se recomienda meter
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,    YA NO SE USA
            //useFindAndModify: false YA NO SE USA
        });
        console.log('Base de datos conectada')
    }catch(error){
        console.log(error);
        throw new Error('Error: base de datos no conectada');
    }
}

export{
    DBConnection
}
