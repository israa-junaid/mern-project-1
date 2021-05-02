import React,{ useEffect,useState,useContext } from 'react'
import { useHistory} from "react-router-dom";
import { UserContext } from "../App";
const Logout = () => {
    const {state,dispatch}= useContext(UserContext);
    const history = useHistory();
   
    const callLogoutPage = async() => {
        try {
            const res = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json ();
            console.log(data);
            // dispatch ({type:"USER",payload:false})
            // history.push('/login')
            if(!res.status === 200){
                const error= new Error(res.error)
                throw error;
            }
             else {
                dispatch ({type:"USER",payload:false})
                history.push('/login', {replace:true});
            }

        } catch (err) {
            console.log(err);
            history.push('/login')

        }

    }

    useEffect(() => {
        callLogoutPage();
    }, [])

    return (
        <div>
            <h1>Logout page</h1>
        </div>
    )
}

export default Logout
