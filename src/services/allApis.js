import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";

export const loginApi=async(data)=>{
   return await commonApi("POST",`${BASE_URL}/login`,data,'')
}


export const getallcat=async()=>{
   return await commonApi("GET",`${BASE_URL}/cat`,'','')
}


export const getallsub=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/subcat/${id}`,'','')
}

export const getcprod=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/getcprod/${id}`,'','')
}

export const getsprod=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/getsprod/${id}`,'','')
}


export const viewp=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/viewprod/${id}`,'','')
}

export const addcart=async(data,header)=>{
   return await commonApi("POST",`${BASE_URL}/addcart`,data,header)
}

export const getcart=async(id,header)=>{
   return await commonApi("GET",`${BASE_URL}/getcart/${id}`,'',header)
}

export const incrcart=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/inccart/${id}`,'','')
}

export const decrcart=async(id)=>{
   return await commonApi("GET",`${BASE_URL}/deccart/${id}`,'','')
}
