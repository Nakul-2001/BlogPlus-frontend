import { useState } from "react"
import "./Register.css"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Register() {

  const [username,setUsername] = useState('');
  const [fullname,setFullname] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!username || !fullname || !password){
        toast.error('Please fill all the fields');
        return;
      };
      if(password.length < 8){
        toast.error('Password should at least have 8 characters');
        return;
      };
      const res = await axios.post('https://blogplus-backend.onrender.com/api/auth/register',{username,fullname,password});
      navigate('/login');
    } catch (error) {
      setError(true);
    }
  }

    return (
      <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={(e)=>handleSubmit(e)}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}/>
        <label>Full Name</label>
        <input className="registerInput" type="text" placeholder="Enter your fullname..." onChange={e=>setFullname(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
        <button className="registerButton">Register</button>
      </form>
      {error && <div style={{color:'tomato'}}>Something went wrong</div>}
    </div>
    )
}