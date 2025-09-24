import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { COOKIENAME } from "./comman";
import { useEffect } from "react";
 export default function Cookie()
 {
      let navigate = useNavigate('');
      // create a cookie variable 
        const [cookies, setCookie, removeCookie] = useCookies([COOKIENAME]);
      
      // create a usezeffact hook
      useEffect(() =>{
       if(cookies['userid'] === undefined){
        navigate("/");
    
       }
      console.log(cookies['userid']);
      })
 }



