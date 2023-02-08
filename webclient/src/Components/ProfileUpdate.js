import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
// import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backArrowButton from '../images/back-arrow-button.png'
function ProfileUpdate() {
   useEffect(()=>{
    onLoadUserDetails();
   },[]);
    let storeObj=useSelector((store)=>{
     return store
    })
    let userNameRef=useRef();
    let emailIdRef=useRef();
    let profilePicRef=useRef();
    let navigate=useNavigate();
    let [profilePic,setProfilePic]=useState("");
    let onLoadUserDetails=async()=>{
      let sendData=new FormData();
      sendData.append("userId",storeObj[1].data.userDetails[0]._id)
      let response=await axios.post("/selectedUser",sendData);
      console.log(response); 
      userNameRef.current.value=response.data.userData[0].userName;
      emailIdRef.current.value=response.data.userData[0].emailId;
      setProfilePic("/"+response.data.userData[0].profilePic);
    }
    let updateUserDetails=async()=>{
      let sendData=new FormData();
      sendData.append("id",storeObj[1].data.userDetails[0]._id);
      sendData.append("userName",userNameRef.current.value);
      sendData.append("emailId",emailIdRef.current.value);
      sendData.append("profilePic",profilePicRef.current.files[0]);
      let response=await axios.patch("/updateUserDetails",sendData);
      console.log(response);
    }
  return (
    <div>
      <button type='button' style={{position:"absolute",left:"3px",top:"0px"}} onClick={()=>{
      navigate("/dashBoard")
      }}><img src={backArrowButton} style={{width:"50px", height:"50px"}} alt='Back Button' title='Back Button' ></img></button>
        <h1>Update Profile Details</h1>
        <form>
          <div>
            <img src={profilePic} alt=''></img>
            <br></br>
            <label>Profile Pic</label>
            <input type='file' ref={profilePicRef}
            onChange={()=>{
              let profilePath=URL.createObjectURL(profilePicRef.current.files[0]);
              setProfilePic(profilePath);
            }}
            ></input>
          </div>
          <div>
        <input ref={userNameRef}></input>
        </div>
        <div>
          <input ref={emailIdRef}></input>
        </div>
        <button type='button' onClick={()=>{
           updateUserDetails();
        }}>Update</button>
        </form>
    </div>
  )
}

export default ProfileUpdate