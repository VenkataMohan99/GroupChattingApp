 import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Moment from 'react-moment';
import axios from 'axios'
import NavBar from './NavBar';
 function DashBoard() {
    useEffect(()=>{
    onLoad();
    messageData();
    },[]);
    let [userDetails,setUserDetails]=useState([]);
    let [textMessages,setTextMessages]=useState([]);
    let navigate=useNavigate(); 
    let storeObj=useSelector((store)=>{
        return store
    })
    // console.log(storeObj);
    let onLoad=()=>{
    if(storeObj.length>1){

    if(storeObj[1].data.loginStatus === true){
     setUserDetails(storeObj[1].data.userDetails);
    //  console.log(userDetails);
    }
}
else{
      return navigate('/'); 
    }
}
let messageInputRef=useRef();
let textSend=async(userName)=>{
let sendData=new FormData();
sendData.append("message",messageInputRef.current.value);
sendData.append("userName",userName);
let response=await axios.post("/textMessages",sendData);
console.log(response);
messageData();
} 

let messageData=async()=>{
let response=await axios.get("/groupMessages");
console.log(response);
setTextMessages(response.data.status); 
}
   return (
     <div className='dashBoardMainDiv'>
        <NavBar></NavBar>
        <h1>Group Chatting App</h1>
        <div className='messagesMainDiv'>
        {textMessages.map((message)=>{ 
          return <div style={{border:"2px solid black" ,margin:"10px"}}>
            <Moment format='D-MMMM-yyy'>{message.date}</Moment>
            <br></br>
            <br></br>

            <span style={{display:"flex",justifyContent:"space-around"}}><strong style={{fontSize:'1.5 rem'}}>{message.userName}</strong> <Moment format='hh:mm:ss'>{message.date}</Moment></span>
            <h1>{message.text}</h1>
            
          </div>
        })}
       
        <form>
          <input placeholder='Enter Message' ref={messageInputRef}></input>
          <button type='button' onClick={()=>{
            textSend(userDetails[0].userName);
          }}>Send Message</button>
          <br></br>
          <br></br>

        <Link to='/' style={{border:"2px solid black",textDecoration:"none",padding:"4px",backgroundColor:"skyblue",color:"black"}}>Logout</Link>

        </form> 
        </div>
     </div>
   )
 }
 
 export default DashBoard 