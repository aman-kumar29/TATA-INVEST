import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../Firebase/config";

function DashboardScreen(){
    const history = useNavigate()

    const handleClick = () =>{
        signOut(database).then(val=>{
            console.log(val,"val")
            history('/')
        })
    }
    return(
        <div>
            <h1>DashboardScreen</h1>
            <button onClick={handleClick}>SignOut</button>
        </div>
    )
}
export default DashboardScreen;