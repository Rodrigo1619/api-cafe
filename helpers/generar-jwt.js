import jwt from 'jsonwebtoken'

const generarJWT = (uid = '')=>{ //se trabajara a bases de promesas - uid: userID
    return new Promise((resolve, reject)=>{

        const payload = {uid}
        //generando jwt
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('no se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

export{
    generarJWT
}