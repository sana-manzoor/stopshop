import axios from "axios";

export const commonApi=async (method,url,body,headers)=>{
    const urlConf={
        method,
        url,
        data:body,
        headers:headers?headers:{'Content-Type':'application/json'}
    }
    
    return await axios(urlConf).then(res=>{return res}).catch(err=>{return err})
}