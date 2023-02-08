import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useDispatch } from "react-redux";


function LoginForm(){
let emailIdInputRef=useRef();
let passwordInputRef=useRef();
let navigate=useNavigate();
let dispatch=useDispatch();
let loginDetails=async()=>{
    let sendData=new FormData();
    sendData.append("emailId",emailIdInputRef.current.value);
    sendData.append("password",passwordInputRef.current.value)
let response=await axios.post("/login",sendData);
// console.log(response);

if(response.data.loginStatus===true){
    dispatch({
        type:"",
        data:response.data,
    })
navigate("/dashBoard");

}else{
alert(response.data.status);

  return  navigate('/');
}
}
     return (
        <div className="loginFormMainDiv">
            <form >
                <fieldset className="loginForm">
                    <h1>Login</h1>  
                    <div>
                        {/* <label>Email Id</label> */}
                        <input placeholder="Enter Email Id" ref={emailIdInputRef}></input>
                    </div>
                    <div>
                        {/* <label>Password</label> */}
                        <input placeholder="Password" ref={passwordInputRef}></input>
                    </div>
                    <button type="button" onClick={()=>{
                        loginDetails();
                    }}>Login</button>
                </fieldset>
            </form>
            <br></br>
            <Link to='/signUpForm' style={{backgroundColor:"white",textDecoration:"none",borderRadius:"5px",padding:"3px"}}>Create New Account</Link>
        </div>
    )
}
export default LoginForm