import './App.css'
import LoginForm from './Components/LoginForm'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import SignupForm from './Components/SignupForm'
import DashBoard from './Components/DashBoard'
import ProfileUpdate from './Components/ProfileUpdate'
export default function App(){
  return(
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm></LoginForm>}></Route>
        <Route path='/signUpForm' element={<SignupForm></SignupForm>}></Route>
        <Route path='/dashBoard' element={<DashBoard></DashBoard>}></Route>
        <Route path='/updateProfile' element={<ProfileUpdate></ProfileUpdate>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}