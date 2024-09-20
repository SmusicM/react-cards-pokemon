import {useEffect,useState} from "react";
import axios from "axios"
const useAxios = (url,options={}) =>{
    const[response,setResponse] = useState(null);
    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(true)
    useEffect(()=>{
      const axiosData = async ()=>{
        try{
           const res = await axios(url,options)
           setResponse(res)
        }catch(e){
         setError(e)
        }
        setIsLoading(false)
      }
      axiosData()
    },[url])
    return {response,error,isLoading}
}

export default useAxios;