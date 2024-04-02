import React from 'react'
import {styled} from 'styled-components'
import Sidebar from '../Components/Sidebar'
import { FaRegCircleUser } from "react-icons/fa6";
import Navbar from '../Components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast'
import axios from 'axios';
import { loginSuccess } from '../Redux/userSlice';

const Container = styled.div`
  display:flex; 
`

const Wrapper = styled.div`
  width:80%;
  padding:2vh 2vw;
  display: flex;
  flex-direction:column;
  gap:5vh;
`

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-size:5vmin;
  color:lightcoral;
`

const Delete = styled.button`
  font-size:3vmin;
  color:red;
  border: none;
  background-color:inherit;
  cursor: pointer;
`

const Profile = styled.div`
  display: flex;
  gap:1vw;
`

const Image = styled.img`
  width:8vw;
  height:12vh;
  border-radius:10px;;
`

const Icon = styled.div`
  margin:3vh 0vw;
  width:3vw;
  height:6vh;
  border-radius:50%;
  background-color:lightcoral;
  svg{
    color:white;
    font-size:4vmin;
    margin:6px 6px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction:column;
`

const Input = styled.input`
  width: 100%;
  border:none;
  border-bottom:1px solid black;
  font-size:3vmin;
  padding:0.5vh 0;
  outline:none;
`

const Button = styled.button`
  font-size:3vmin;
  width:8vw;
  background-color:teal;
  color:white;
  border: none;
  border-radius:5px;
  padding:1vh 0;
  margin-left:45%;
  margin-top: 4vh;
`

const Update = () => {

  const {currentUser} = useSelector((state)=>state.user);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password || !fullname){
      toast.error('Please fill all the fields');
      return;
    }
    const updatedUser = {
      username,
      fullname,
      password,      
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`https://blogplus-backend.onrender.com/api/upload`, data);
      } catch (err) {console.log('upload',err)}
    }

    try {
      const res = await axios.put(`https://blogplus-backend.onrender.com/api/user/${currentUser._id}`, updatedUser);
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      toast.success("User has been updated successfully");
    } catch (err) {console.log('post',err)}
  };

  const PF = 'https://blogplus-backend.onrender.com/images/';

  return (
    <>
    <Navbar></Navbar>
    <Container>
      <Wrapper>
        <Heading>
            <Title>Update Your Account</Title>
            <Delete>Delete Account</Delete>
        </Heading>
        <label htmlFor='img' style={{fontSize:'4vmin'}}>Profile Picture</label>
        <Profile>   
            <Image id='img' src={file ? URL.createObjectURL(file) : PF+currentUser.profilePic}></Image>
            <label htmlFor='icon'><Icon><FaRegCircleUser /></Icon></label>
            <input type='file' id='icon' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}></input>
        </Profile>
        <Form onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor='username' style={{fontSize:'4vmin',paddingTop:'4vh'}}>Username</label>
            <Input id='username' placeholder={currentUser.username} onChange={(e)=>setUsername(e.target.value)}></Input>
            <label htmlFor='fullname' style={{fontSize:'4vmin',paddingTop:'4vh'}}>Full Name</label>
            <Input id='fullname' placeholder={currentUser.fullname} onChange={(e)=>setFullname(e.target.value)}></Input>
            <label htmlFor='password' style={{fontSize:'4vmin',paddingTop:'4vh'}}>Password</label>
            <Input id='password' onChange={(e)=>setPassword(e.target.value)}></Input>
            <Button type='submit'>Update</Button>
        </Form>
      </Wrapper>
      <Sidebar/>
    </Container>
    </>
  )
}

export default Update
