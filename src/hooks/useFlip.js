import React, { useState } from "react";
const useFlip = (initialState = true) =>{
 const[state,setState] = useState(initialState)
 const toggState = () =>{
    setState(state=>!state)
 }
 return[state,toggState]
}

export default useFlip