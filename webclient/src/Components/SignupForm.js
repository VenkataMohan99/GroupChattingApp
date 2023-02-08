import React,{useRef, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
function SignupForm() {
    let userNameInputRef=useRef();
    let emailInputRef=useRef();
    let passwordInputRef=useRef();
    let confirmpasswordInputRef=useRef();
    let profilePicInputRef=useRef();
    let [profilePicPreview,setProfilePicPreview]=useState("https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png");
    let signUpDetails=async()=>{
      let password;
      let sendData= new FormData();
      sendData.append('userName',userNameInputRef.current.value);
      sendData.append('emailId',emailInputRef.current.value);
      sendData.append('profilePic',profilePicInputRef.current.files[0]);
      if(passwordInputRef.current.value === confirmpasswordInputRef.current.value){
        console.log("True Password")
        password=passwordInputRef.current.value 
      }else{
        console.log("Invalid Password"); 
        password=""
        alert("Invalid Password!")
      }
      sendData.append('password',password);
      let response=await axios.post("/signupDetails",sendData);
      console.log(response);
      alert(response.data.status);
    }
  return (
    <div className='signupFormMainDiv'>
     <h1>Chating App</h1>
        <form>
                <fieldset>
                    <h2>Sign Up</h2>
                    <img src={profilePicPreview} alt='' onClick={()=>{
                      console.log("Hello");
                    }}></img>
                    <div>
                      <label style={{display:"inline-block",width:"150px",textAlign:"right"}}>Profile Pic</label>
                      <input type='file' placeholder='Profile Pic' ref={profilePicInputRef}
                       
                      onChange={()=>{
                        let profilePath=URL.createObjectURL(profilePicInputRef.current.files[0]);
                        setProfilePicPreview(profilePath);
                        console.log("path"+profilePath)
                      }}
                     ></input>
                     {/* <label>Profile Pic</label> */}
                    </div>
                    <div>
                        {/* <label>User Name</label> */}
                        <input ref={userNameInputRef} placeholder='User Name'
                        onChange={()=>{
                          let regEx=/^[A-Za-z0-9.\-\_\ \@]{2,15}$/
                          if(regEx.test(userNameInputRef.current.value)){
                            userNameInputRef.current.style.border="3px solid green"
                          }else{
                            userNameInputRef.current.style.border="3px solid red"
                          }
                        }}
                        ></input>
                    </div>
                    <div>
                        {/* <label>Email Id</label> */}
                        <input ref={emailInputRef} placeholder=' ✉️ Email Id'
                        onChange={()=>{
                          let regEx=/^[A-Za-z0-9.\-\_\]+\@[A-Za-z0-9.\_\-]+\.([A-Z-a-z]{3,4})$/
                          if(regEx.test(emailInputRef.current.value)){
                            emailInputRef.current.style.border="3px solid green"
                          }else{
                            emailInputRef.current.style.border="3px solid red"

                          }
                        }}
                        ></input>
                    </div>
                    <div>
                      {/* <label>Password</label> */}
                      <input ref={passwordInputRef} placeholder='Password'
                      onChange={()=>{
                        let regEx=/^[A-Za-z0-9\@]{6,15}$/
                        if((passwordInputRef.current.value).match(regEx)){
                          passwordInputRef.current.style.border='3px solid green'
                        }else{
                          passwordInputRef.current.style.border='3px solid red'

                        }
                      }}
                      ></input>
                    </div>
                    <div>
                        {/* <label>Confirm Password</label> */}
                        <input ref={confirmpasswordInputRef} placeholder="Confirm Password"
                         onChange={()=>{
                          let regEx=/^[A-Za-z0-9\@]{6,15}$/
                          if((confirmpasswordInputRef.current.value).match(regEx)){
                            confirmpasswordInputRef.current.style.border='3px solid green'
                          }else{
                            confirmpasswordInputRef.current.style.border='3px solid red'
  
                          }
                        }}
                        ></input>
                    </div>
                    <button type="button" onClick={()=>{
                      signUpDetails();
            }}>Sign Up</button>
                </fieldset>
            </form>
            <Link to='/login'>Login</Link>
    </div>
  )
}

export default SignupForm