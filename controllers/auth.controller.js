import { response } from "express"

const login = (req, res=response)=>{
    res.json({
        msg:'login oc'
    })
}

export{
    login
}