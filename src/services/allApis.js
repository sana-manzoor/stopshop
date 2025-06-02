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