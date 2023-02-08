import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

function NavBar() {
  useEffect(()=>{
    userDetailsOnLoad()
  },[]);
  let [userProfile,setUserProfile]=useState([]);
  let [menuButton,setMenuButton]=useState("☰");
  let [profileDetails,setProfileDetails]=useState("profileView");
  let navigate=useNavigate();
  let storeObj=useSelector((store)=>{
    return store
  });
console.log(storeObj); 
  let userDetailsOnLoad=async()=>{
    let sendData=new FormData();
    sendData.append("userId",storeObj[1].data.userDetails[0]._id)
    let response=await axios.post("/selectedUser",sendData); 
    console.log(response); 
    setUserProfile(response.data.userData); 
    
  }
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <button  type='button' onClick={()=>{
        if(profileDetails === "profileView"){
          setProfileDetails("profileViewActive");
          setMenuButton("✖")
        }else{
          setProfileDetails("profileView");
          setMenuButton("☰")
        }
      }} style={{height:"30px"}}>{menuButton}</button>
        {userProfile.map((user)=>{
        return <div>
       <br></br>
          <ul className={profileDetails}>
          <img src={`/${user.profilePic}`} alt='profile pic' style={{borderRadius:"40%",objectFit:"cover"}}></img> 
          <li>User Name : <strong>{user.userName}</strong></li> 
          <li>Email Id : {user.emailId}</li>
          <button type='button' onClick={()=>{
           navigate("/updateProfile",{emailId:`${user.emailId}`});
          }}>Update Profile</button>
          <li> <NavLink to='/signUpForm'>Register</NavLink></li>
          <li><NavLink to='/'>Login</NavLink></li>
          </ul>
        </div>
        })}
       

    </div>
  )
}

export default NavBar