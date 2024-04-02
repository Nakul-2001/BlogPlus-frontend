import { useState } from "react";
import "./Login.css";
import toast from "react-hot-toast";
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {loginSuccess,loginStart,loginFailure} from '../../Redux/userSlice'

export default function Login() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!username || !password) {
        toast.error('Please fill all the fields');
        return;
      }
      if(password.length < 8) {
        toast.error('Password should at least have 8 characters');
        return;
      }
      dispatch(loginStart());
      const res = await axios.post('http://localhost:3000/api/auth/login',{username,password});
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate('/');
      
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
      setError(true);
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={(e)=>(handleSubmit(e))}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
        <button className="loginButton">Login</button>
      </form>
      {error && <div style={{color:'tomato'}}>Something went wrong.</div>}
    </div>
  );
}